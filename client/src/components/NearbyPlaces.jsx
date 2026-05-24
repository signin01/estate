import React, { useState } from 'react';
import { FaHospital, FaSchool, FaTrain, FaShoppingCart, FaUtensils, FaParking } from 'react-icons/fa';

function NearbyPlaces({ location }) {
    const [places] = useState([
        { name: 'City Hospital', distance: '1.2 km', icon: <FaHospital />, type: 'hospital' },
        { name: 'Delhi Public School', distance: '0.8 km', icon: <FaSchool />, type: 'school' },
        { name: 'Metro Station', distance: '1.5 km', icon: <FaTrain />, type: 'metro' },
        { name: 'City Mall', distance: '2.0 km', icon: <FaShoppingCart />, type: 'mall' },
        { name: 'Restaurant Hub', distance: '0.5 km', icon: <FaUtensils />, type: 'restaurant' },
        { name: 'Parking Zone', distance: '0.3 km', icon: <FaParking />, type: 'parking' }
    ]);

    return (
        <div style={{ marginTop: '20px' }}>
            <h4>Nearby Places</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px', marginTop: '10px' }}>
                {places.map((place, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: '#f8f9fa', borderRadius: '8px' }}>
                        <span style={{ color: '#667eea' }}>{place.icon}</span>
                        <div><strong>{place.name}</strong><br /><small>{place.distance}</small></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NearbyPlaces;
