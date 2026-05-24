import React, { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

function CurrencyConverter() {
    const [amount, setAmount] = useState(1000000);
    const [fromCurrency, setFromCurrency] = useState('INR');
    const [toCurrency, setToCurrency] = useState('USD');
    const [converted, setConverted] = useState(null);

    const rates = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095, AED: 0.044, SGD: 0.016 };

    const convertCurrency = () => {
        const result = amount * (rates[toCurrency] / rates[fromCurrency]);
        setConverted(result.toFixed(2));
    };

    return (
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px', marginTop: '20px' }}>
            <h3><FaExchangeAlt /> Currency Converter</h3>
            <div style={{ display: 'grid', gap: '10px', marginTop: '15px' }}>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}><option>INR</option><option>USD</option><option>EUR</option><option>GBP</option><option>AED</option><option>SGD</option></select>
                    <span>?</span>
                    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}><option>USD</option><option>INR</option><option>EUR</option><option>GBP</option><option>AED</option><option>SGD</option></select>
                </div>
                <button onClick={convertCurrency} className="btn-primary">Convert</button>
                {converted && <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>{amount} {fromCurrency} = {converted} {toCurrency}</div>}
            </div>
        </div>
    );
}

export default CurrencyConverter;
