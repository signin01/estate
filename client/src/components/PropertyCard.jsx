import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

function PropertyCard({ property }) {
    const navigate = useNavigate();

    return (
        <div className="property-card" onClick={() => navigate(`/property/${property._id}`)} style={{ cursor: 'pointer' }}>
            <img src={property.mainImage} alt={property.title} className="property-image" />
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '18px' }}>{property.title}</h3>
                    <span style={{ background: property.status === 'sale' ? '#28a745' : '#ff9800', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
                        {property.status === 'sale' ? 'For Sale' : 'For Rent'}
                    </span>
                </div>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaMapMarkerAlt size={12} /> {property.location.address}, {property.location.city}
                </p>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaBed /> {property.bedrooms} Beds</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaBath /> {property.bathrooms} Baths</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaRulerCombined /> {property.area} sqft</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>Rs. {property.price.toLocaleString()}</span>
                    <button className="btn-primary" style={{ padding: '8px 20px' }}>View Details</button>
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;
