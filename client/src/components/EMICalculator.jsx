import React, { useState } from 'react';
import { FaCalculator, FaRupeeSign, FaPercentage, FaCalendarAlt } from 'react-icons/fa';

function EMICalculator() {
    const [principal, setPrincipal] = useState(5000000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [emi, setEmi] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);

    const calculateEMI = () => {
        const p = principal;
        const r = rate / 12 / 100;
        const n = tenure * 12;
        
        const emiValue = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        const total = emiValue * n;
        const interest = total - p;
        
        setEmi(emiValue.toFixed(0));
        setTotalInterest(interest.toFixed(0));
        setTotalPayment(total.toFixed(0));
    };

    React.useEffect(() => {
        calculateEMI();
    }, [principal, rate, tenure]);

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-IN').format(num);
    };

    return (
        <div style={{ background: 'white', borderRadius: '20px', padding: '30px', maxWidth: '500px', margin: '0 auto', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <FaCalculator /> Home Loan EMI Calculator
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    <FaRupeeSign /> Loan Amount (Rs.)
                </label>
                <input 
                    type="range" 
                    min="100000" 
                    max="50000000" 
                    step="100000"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Rs. 1,00,000</span>
                    <span style={{ fontWeight: 'bold' }}>Rs. {formatNumber(principal)}</span>
                    <span>Rs. 5,00,00,000</span>
                </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    <FaPercentage /> Interest Rate (% per annum)
                </label>
                <input 
                    type="range" 
                    min="6" 
                    max="15" 
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>6%</span>
                    <span style={{ fontWeight: 'bold' }}>{rate}%</span>
                    <span>15%</span>
                </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    <FaCalendarAlt /> Loan Tenure (Years)
                </label>
                <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>1 year</span>
                    <span style={{ fontWeight: 'bold' }}>{tenure} years</span>
                    <span>30 years</span>
                </div>
            </div>
            
            {emi && (
                <div style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                    color: 'white', 
                    borderRadius: '15px', 
                    padding: '20px',
                    marginTop: '20px'
                }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Your EMI Details</h3>
                    <div style={{ display: 'grid', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Monthly EMI:</span>
                            <strong style={{ fontSize: '20px' }}>Rs. {formatNumber(emi)}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Total Interest Payable:</span>
                            <strong>Rs. {formatNumber(totalInterest)}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Total Payment:</span>
                            <strong>Rs. {formatNumber(totalPayment)}</strong>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EMICalculator;
