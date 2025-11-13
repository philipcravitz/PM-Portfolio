import { useParams, Link } from "react-router-dom";
// 💥 Import useEffect
import { useMemo, useEffect } from "react"; 
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import blogManifest from "../data/blogs.json";

export default function BlogDetail() {
  const { id } = useParams();

  // 💥 SCROLL FIX: Scroll to the top when the component mounts or the ID changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Ensures the scroll happens immediately
    });
  }, [id]); // This ensures scrolling happens when navigating between different blog posts

  // Lookup blog in manifest (no fetch needed)
  const blog = useMemo(
    () => blogManifest.find((b) => b.id === id) || null,
    [id]
  );

  if (!blog) {
    return (
      <main>
        <h1>Blog not found</h1>
        <Link to="/blog">← Back to All Posts</Link>
      </main>
    );
  }

  return (
    <main className="blog-detail-container">
      <nav className="back-link">
        <Link to="/blog">← Back to All Posts</Link>
      </nav>

      <article className="blog-content">
        <h1>{blog.title}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.body}
        </ReactMarkdown>
      </article>

      <aside className="blog-sidebar">
        {blog.date && <p className="date">{blog.date}</p>}
        {blog.tags?.length > 0 && (
          <div className="tag-list">
            {blog.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </aside>
    </main>
  );
}