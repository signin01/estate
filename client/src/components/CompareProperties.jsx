import React, { useState } from 'react';
import { FaCheck, FaTimes, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

function CompareProperties({ properties }) {
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [showCompare, setShowCompare] = useState(false);

    const addToCompare = (property) => {
        if (selectedProperties.length >= 3) {
            alert('You can compare up to 3 properties only');
            return;
        }
        if (!selectedProperties.find(p => p.id === property.id)) {
            setSelectedProperties([...selectedProperties, property]);
        }
    };

    const removeFromCompare = (propertyId) => {
        setSelectedProperties(selectedProperties.filter(p => p.id !== propertyId));
    };

    const clearCompare = () => {
        setSelectedProperties([]);
        setShowCompare(false);
    };

    return (
        <div>
            {!showCompare ? (
                <button onClick={() => setShowCompare(true)} className="btn-secondary" style={{ marginBottom: '20px' }}>
                    Compare Properties ({selectedProperties.length})
                </button>
            ) : (
                <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '20px', overflowX: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3>Compare Properties</h3>
                        <button onClick={clearCompare} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '20px', cursor: 'pointer' }}>Close</button>
                    </div>
                    
                    {selectedProperties.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '40px' }}>Click on "Compare" on any property to add it here</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selectedProperties.length + 1}, 1fr)`, gap: '15px', minWidth: '600px' }}>
                            <div style={{ fontWeight: 'bold', padding: '10px' }}>Feature</div>
                            {selectedProperties.map(prop => (
                                <div key={prop.id} style={{ textAlign: 'center', padding: '10px', background: '#f8f9fa', borderRadius: '8px' }}>
                                    <img src={prop.mainImage} alt={prop.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                                    <strong>{prop.title}</strong>
                                    <button onClick={() => removeFromCompare(prop.id)} style={{ display: 'block', marginTop: '10px', background: '#dc3545', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '5px', cursor: 'pointer', fontSize: '11px' }}>Remove</button>
                                </div>
                            ))}
                            
                            <div style={{ padding: '10px', background: '#f0f0f0' }}>Price</div>
                            {selectedProperties.map(prop => (
                                <div key={prop.id} style={{ textAlign: 'center', padding: '10px', fontWeight: 'bold', color: '#667eea' }}>
                                    Rs. {prop.price.toLocaleString()}
                                </div>
                            ))}
                            
                            <div style={{ padding: '10px', background: '#f0f0f0' }}>Location</div>
                            {selectedProperties.map(prop => (
                                <div key={prop.id} style={{ textAlign: 'center', padding: '10px' }}>{prop.location.city}</div>
                            ))}
                            
                            <div style={{ padding: '10px', background: '#f0f0f0' }}>Bedrooms</div>
                            {selectedProperties.map(prop => (
                                <div key={prop.id} style={{ textAlign: 'center', padding: '10px' }}><FaBed /> {prop.bedrooms}</div>
                            ))}
                            
                            <div style={{ padding: '10px', background: '#f0f0f0' }}>Bathrooms</div>
                            {selectedProperties.map(prop => (
                                <div key={prop.id} style={{ textAlign: 'center', padding: '10px' }}><FaBath /> {prop.bathrooms}</div>
                            ))}
                            
                            <div style={{ padding: '10px', background: '#f0f0f0' }}>Area</div>
                            {selectedProperties.map(prop => (
                                <div key={prop.id} style={{ textAlign: 'center', padding: '10px' }}><FaRulerCombined /> {prop.area} sqft</div>
                            ))}
                            
                            <div style={{ padding: '10px', background: '#f0f0f0' }}>Amenities</div>
                            {selectedProperties.map(prop => (
                                <div key={prop.id} style={{ textAlign: 'center', padding: '10px', fontSize: '12px' }}>
                                    {prop.amenities?.slice(0, 3).join(', ')}
                                    {prop.amenities?.length > 3 && '...'}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {properties?.slice(0, 6).map(property => (
                    <div key={property.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', textAlign: 'center', width: '150px' }}>
                        <img src={property.mainImage} alt={property.title} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
                        <p style={{ fontSize: '12px', marginTop: '5px' }}>{property.title.substring(0, 20)}</p>
                        <button onClick={() => addToCompare(property)} className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px', marginTop: '5px' }}>Compare</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CompareProperties;
