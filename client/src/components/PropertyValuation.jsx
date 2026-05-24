import React, { useState } from 'react';
import { FaChartLine } from 'react-icons/fa';

function PropertyValuation() {
    const [area, setArea] = useState(1000);
    const [bedrooms, setBedrooms] = useState(2);
    const [location, setLocation] = useState('Mumbai');
    const [estimatedValue, setEstimatedValue] = useState(null);

    const calculateValue = () => {
        let basePrice = location === 'Mumbai' ? 15000 : location === 'Delhi' ? 12000 : location === 'Bangalore' ? 10000 : 8000;
        let value = area * basePrice;
        value += bedrooms * 500000;
        value += Math.random() * 2000000;
        setEstimatedValue(value.toFixed(0));
    };

    return (
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px' }}>
            <h3><FaChartLine /> Property Valuation</h3>
            <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
                <input type="number" placeholder="Area (sqft)" value={area} onChange={(e) => setArea(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}><option value="1">1 BHK</option><option value="2">2 BHK</option><option value="3">3 BHK</option><option value="4">4+ BHK</option></select>
                <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}><option>Mumbai</option><option>Delhi</option><option>Bangalore</option><option>Chennai</option><option>Hyderabad</option></select>
                <button onClick={calculateValue} className="btn-primary">Estimate Value</button>
                {estimatedValue && <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '10px', textAlign: 'center' }}><strong>Estimated Value:</strong><br />Rs. {parseInt(estimatedValue).toLocaleString()}</div>}
            </div>
        </div>
    );
}

export default PropertyValuation;
