import React, { useState } from 'react';
import { FaCalculator } from 'react-icons/fa';

function MortgageCalculator() {
    const [homePrice, setHomePrice] = useState(5000000);
    const [downPayment, setDownPayment] = useState(1000000);
    const [loanTerm, setLoanTerm] = useState(20);
    const [interestRate, setInterestRate] = useState(8.5);
    const [result, setResult] = useState(null);

    const calculateMortgage = () => {
        const loanAmount = homePrice - downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const months = loanTerm * 12;
        const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
        const totalPayment = emi * months;
        const totalInterest = totalPayment - loanAmount;
        setResult({ emi: emi.toFixed(0), totalPayment: totalPayment.toFixed(0), totalInterest: totalInterest.toFixed(0) });
    };

    return (
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px', marginTop: '20px' }}>
            <h3><FaCalculator /> Mortgage Calculator</h3>
            <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
                <div><label>Home Price: Rs. {homePrice.toLocaleString()}</label><input type="range" min="1000000" max="20000000" step="100000" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} style={{ width: '100%' }} /></div>
                <div><label>Down Payment: Rs. {downPayment.toLocaleString()}</label><input type="range" min="0" max={homePrice} step="50000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} style={{ width: '100%' }} /></div>
                <div><label>Loan Term: {loanTerm} years</label><input type="range" min="5" max="30" step="5" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} style={{ width: '100%' }} /></div>
                <div><label>Interest Rate: {interestRate}%</label><input type="range" min="6" max="15" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={{ width: '100%' }} /></div>
                <button onClick={calculateMortgage} className="btn-primary">Calculate</button>
                {result && (
                    <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '10px', marginTop: '10px' }}>
                        <p><strong>Monthly EMI:</strong> Rs. {parseInt(result.emi).toLocaleString()}</p>
                        <p><strong>Total Interest:</strong> Rs. {parseInt(result.totalInterest).toLocaleString()}</p>
                        <p><strong>Total Payment:</strong> Rs. {parseInt(result.totalPayment).toLocaleString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MortgageCalculator;
