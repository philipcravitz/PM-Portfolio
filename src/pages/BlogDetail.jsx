import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import fm from 'front-matter';

export default function BlogDetail() {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState({ title: '', date: '', tags: [] });

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}blogs/${id}.md`;
    console.log('Fetching blog from:', url);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(raw => {
        const parsed = fm(raw);
        setContent(parsed.body || '');
        setMeta(parsed.attributes || { title: '', date: '', tags: [] });
      })
      .catch(err => {
        console.error('Fetch failed:', err);
        setContent('# Blog not found');
        setMeta({ title: 'Not Found', date: '', tags: [] });
      });
  }, [id]);

  return (
    <main className="blog-detail-container">
      <article className="blog-content">
        {/* Updated back-link for React Router with hash */}
        <nav className="back-link">
          <Link to="/blog" onClick={() => {
            // optional: scroll to top of projects page or hash
            setTimeout(() => {
              const el = document.getElementById('blog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}>
            ← Back to All Posts
          </Link>
        </nav>

        {meta.title && <h1>{meta.title}</h1>}

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content || 'This post could not be rendered. Please check back later.'}
        </ReactMarkdown>
      </article>

      <aside className="blog-sidebar">
        {meta.date && <p className="date">{meta.date}</p>}

        {meta.tags?.length > 0 && (
          <div className="tag-list">
            {meta.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </aside>
    </main>
  );
}
