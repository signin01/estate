// client/src/components/ShareButtons.jsx
import React from 'react';

const ShareButtons = ({ property }) => {
  const shareUrl = window.location.href;
  const text = `Check out this property: ${property?.title || 'Amazing Property'}`;

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${text} ${shareUrl}`, '_blank');
  };

  return (
    <div style={styles.container}>
      <h4>Share this property:</h4>
      <button onClick={shareOnFacebook} style={styles.facebook}>Facebook</button>
      <button onClick={shareOnTwitter} style={styles.twitter}>Twitter</button>
      <button onClick={shareOnWhatsApp} style={styles.whatsapp}>WhatsApp</button>
    </div>
  );
};

const styles = {
  container: {
    margin: '1rem 0'
  },
  facebook: {
    margin: '0 0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#3b5998',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  twitter: {
    margin: '0 0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#1da1f2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  whatsapp: {
    margin: '0 0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#25d366',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default ShareButtons;