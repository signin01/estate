import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import toast from 'react-hot-toast';

function PriceAlert({ propertyId, currentPrice }) {
    const [alertSet, setAlertSet] = useState(false);
    const [targetPrice, setTargetPrice] = useState('');

    const setPriceAlert = () => {
        if (!targetPrice) {
            toast.error('Enter target price');
            return;
        }
        const alerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
        alerts.push({ propertyId, targetPrice: parseFloat(targetPrice), currentPrice });
        localStorage.setItem('priceAlerts', JSON.stringify(alerts));
        setAlertSet(true);
        toast.success(`Alert set! We'll notify you when price drops below Rs. ${targetPrice}`);
    };

    return (
        <div style={{ marginTop: '15px' }}>
            {!alertSet ? (
                <div>
                    <input type="number" placeholder="Target price" value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} style={{ padding: '8px', width: '120px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                    <button onClick={setPriceAlert} className="btn-secondary" style={{ padding: '8px 15px' }}><FaBell /> Set Alert</button>
                </div>
            ) : (
                <p style={{ color: '#4caf50', fontSize: '12px' }}>? Alert set for price drop</p>
            )}
        </div>
    );
}

export default PriceAlert;
