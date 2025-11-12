import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProjectContext } from '../ProjectContext';

function Header() {
  const { projectTitle } = useContext(ProjectContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu if resizing back to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isBlogDetail = location.pathname.startsWith('/blog/');
  const isBlogList = location.pathname === '/blog';

  const title = isBlogDetail
    ? null
    : isBlogList
    ? 'Dispatches from a Product Mind'
    : projectTitle && projectTitle.trim() !== ''
    ? projectTitle
    : 'Portfolio';

  return (
    <header className="site-header">
      <div className="header-left">
        <Link to="/" aria-label="Home">
          <img src="images/pc-logo.png" alt="Philip Cravitz Logo" />
        </Link>
      </div>

      {title && (
        <div className={`page-title ${menuOpen ? 'opacity-0' : 'opacity-100'}`}>
          {title}
        </div>
      )}

      <nav className={`header-nav ${menuOpen ? 'show' : ''}`}>
        <a
          href="#contact"
          className="header-link"
          onClick={(e) => {
            e.preventDefault();
            const footer = document.getElementById('contact');
            if (footer) footer.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
          }}
        >
          Connect
        </a>
        <span className="divider">|</span>
        <Link
          to="/projects"
          className="header-link"
          onClick={() => setMenuOpen(false)}
        >
          Engage
        </Link>
        <span className="divider">|</span>
<Link
  to="/blog"
  className="header-link"
  onClick={() => setMenuOpen(false)}
>
  Read
</Link>
      </nav>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(prev => !prev)}
        type="button"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </header>
  );
}

export default Header;
