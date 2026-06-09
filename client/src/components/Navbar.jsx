// client/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>RealEstate</h1>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/properties" style={styles.link}>Properties</Link></li>
        <li><Link to="/contact" style={styles.link}>Contact</Link></li>
        <li><Link to="/login" style={styles.link}>Login</Link></li>
        <li><Link to="/register" style={styles.link}>Register</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2c3e50',
    color: 'white'
  },
  logo: {
    margin: 0
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
};

export default Navbar;