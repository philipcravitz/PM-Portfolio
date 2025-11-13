import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import blogManifest from "../data/blogs.json"; // Already includes blog content

export default function BlogList() {
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" | "alphabetical"
  const observer = useRef(null);

  // 💥 SCROLL FIX: Scroll to the top when the component mounts
  useEffect(() => {
    // This ensures the page always starts at the top when navigating to /blog
    window.scrollTo(0, 0);
    // Dependency array is empty ([]), so this only runs once when the component is first loaded
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

    const elements = document.querySelectorAll(".blog-card-wrapper");
    elements.forEach((el) => observer.current.observe(el));

    return () => observer.current.disconnect();
  }, [sortOrder]); // ⚠️ IMPORTANT: Added 'sortOrder' to re-observe elements after sorting

  // Sort the blogs based on user selection
  const sortedBlogs = [...blogManifest].sort((a, b) => {
    if (sortOrder === "newest") {
      // Use date strings for comparison, assuming format like 'YYYY-MM-DD'
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
        {/* Placeholder logic for pre-rendered content if needed, removed for simplicity */}
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