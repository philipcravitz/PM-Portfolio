import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import fm from "front-matter";
import blogManifest from "../data/blogs.json";

export default function BlogList() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" | "alphabetical"
  const observer = useRef(null);

  useEffect(() => {
    async function loadBlogs() {
      const loaded = await Promise.all(
        blogManifest.map(async (entry) => {
          const url = `/${entry.path}`;
          try {
            const res = await fetch(url);
            const raw = await res.text();
            const parsed = fm(raw);

            return {
              id: entry.id,
              title: parsed.attributes.title || entry.title,
              date: parsed.attributes.date || entry.date,
              teaser: parsed.body.trim().split("\n")[0],
            };
          } catch (err) {
            console.error(`Failed to load ${entry.id}:`, err);
            return null;
          }
        })
      );

      const sorted = loaded
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setAllBlogs(sorted);
    }

    loadBlogs();
  }, []);

  // Intersection Observer for fade-in
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".blog-card-wrapper");
    elements.forEach((el) => observer.current.observe(el));
    return () => observer.current.disconnect();
  }, [allBlogs, sortOrder]);

  // Sort the blogs based on user selection
  const sortedBlogs = [...allBlogs].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <main className="blog-list-page">
      <div className="sort-controls">
        <label htmlFor="sortOrder" className="sort-label">
          Sort by:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-dropdown"
        >
          <option value="newest">Newest First</option>
          <option value="alphabetical">A–Z</option>
        </select>
      </div>

      <section className="blog-list">
        {sortedBlogs.map((blog) => (
          <div key={blog.id} className="blog-card-wrapper">
            <Link to={`/blog/${blog.id}`} className="blog-preview">
              <div className="blog-card">
                <div className="blog-info">
                  <h2 className="blog-title">{blog.title}</h2>
                  <p className="blog-teaser">{blog.teaser}</p>
                  <span className="read-more">Read more →</span>
                  <div className="blog-meta">
                    <span className="blog-date">{blog.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
