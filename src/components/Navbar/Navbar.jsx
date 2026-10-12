import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Navbar.css';
import logo from '../../assets/Logo/logo.png';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  // Transform values: Move up and fade out as user scrolls
  const y = useTransform(scrollY, [0, 80], [0, -100]);
  const opacity = useTransform(scrollY, [0, 40], [1, 0]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <motion.div
          className="navbar-logo"
          style={{ y, opacity }}
        >
          <NavLink to="/" onClick={closeMobileMenu}>
            <img src={logo} alt="E-Cell Logo" className="logo-img" />
          </NavLink>
        </motion.div>

        <div className={`nav-menu-wrapper ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMobileMenu} end>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMobileMenu}>About</NavLink></li>
            <li><NavLink to="/events" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMobileMenu}>Events</NavLink></li>
           
            {/* <li><NavLink to="/blog" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMobileMenu}>Blog</NavLink></li> */}

            <li><NavLink to="/result" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMobileMenu}>Result</NavLink></li>

            <li><NavLink to="/team" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMobileMenu}>Team</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMobileMenu}>Contact Us</NavLink></li>
            
            {/* <li className="mobile-nav-item"><NavLink to="/register" className="register-btn" onClick={closeMobileMenu}>Register</NavLink></li> */}
            
          </ul>
        </div>

        {/* Register button for desktop only */}
        {/* <motion.div
          className="navbar-actions"
          style={{ y, opacity }}
        >
          <NavLink to="/register" className="register-btn" onClick={closeMobileMenu}>
            Register
          </NavLink>
        </motion.div> */}

        <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <X size={28} color="#fff" />
          ) : (
            <Menu size={28} color="#fff" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
