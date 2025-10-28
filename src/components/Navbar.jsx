import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="logo">Phil's Portfolio</div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          <NavLink to="/project1" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Project 1</NavLink>
          <NavLink to="/project2" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Project 2</NavLink>
          <NavLink to="/project3" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Project 3</NavLink>
          <NavLink to="/project4" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Project 4</NavLink>
          <NavLink to="/project5" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Project 5</NavLink>
        </nav>
      </div>
    </header>
  );
}