// client/src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 RealEstate. All rights reserved.</p>
      <p>Find your dream home with us!</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
};

export default Footer;