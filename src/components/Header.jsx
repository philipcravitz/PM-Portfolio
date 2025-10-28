// src/components/Header.jsx
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

  // Close mobile menu on desktop resize
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) setMenuOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <header className="site-header relative flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/" aria-label="Home">
            <img src="/images/pc-logo.png" alt="Philip Cravitz Logo" />
          </Link>
        </div>

        {/* Center: Desktop Page Title */}
        <div
          className="center-title"
          aria-hidden={menuOpen ? 'true' : 'false'}
        >
          {projectTitle && projectTitle.trim() !== '' ? projectTitle : 'Portfolio'}
        </div>

        {/* Right: Desktop nav buttons */}
        <nav className="header-buttons" aria-label="Primary">
          <a href="#contact" className="header-button connect">
            Connect
          </a>
          <Link to="/projects" className="header-button engage">
            Engage
          </Link>
        </nav>

        {/* Hamburger for mobile */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
          type="button"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* Mobile dropdown */}
        <div
          className={`nav-links ${menuOpen ? 'show' : ''}`}
          role="menu"
          aria-hidden={!menuOpen}
        >
          <a
            href="#contact"
            className="header-button connect"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            Connect
          </a>
          <Link
            to="/projects"
            className="header-button engage"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            Engage
          </Link>
        </div>
      </header>

      {/* Mobile page title below header */}
      <h1 className="mobile-page-title">
        {projectTitle && projectTitle.trim() !== '' ? projectTitle : 'Portfolio'}
      </h1>
    </>
  );
}

export default Header;
