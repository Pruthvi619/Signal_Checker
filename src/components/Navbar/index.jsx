import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          📶 SignalChecker
        </NavLink>

        {/* Hamburger icon */}
        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" className="navbar-item" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" className="navbar-item" onClick={closeMenu}>About</NavLink>
          <NavLink to="/check-signal" className="navbar-item" onClick={closeMenu}>Check Signal</NavLink>
          <NavLink to="/compare-providers" className="navbar-item" onClick={closeMenu}>Compare</NavLink>
          <NavLink to="/contact" className="navbar-item" onClick={closeMenu}>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
