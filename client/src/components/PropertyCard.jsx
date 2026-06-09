// client/src/components/PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <div style={styles.card}>
      <h3>{property.title || 'Property Title'}</h3>
      <p><strong>Location:</strong> {property.location || 'Unknown'}</p>
      <p><strong>Price:</strong> ₹{property.price?.toLocaleString() || '0'}</p>
      <p><strong>Beds:</strong> {property.beds || 0} | <strong>Baths:</strong> {property.baths || 0}</p>
      <Link to={`/property/${property._id}`} style={styles.button}>
        View Details
      </Link>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem',
    width: '300px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  button: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px'
  }
};

export default PropertyCard;