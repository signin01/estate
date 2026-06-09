// client/src/components/EMICalculator.jsx
import React, { useState } from 'react';

const EMICalculator = () => {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const principal = amount;
    const monthlyRate = rate / (12 * 100);
    const months = years * 12;
    
    const emiValue = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(Math.round(emiValue));
  };

  return (
    <div style={styles.container}>
      <h3>EMI Calculator</h3>
      <div>
        <label>Loan Amount: ₹{amount.toLocaleString()}</label>
        <input type="range" min="100000" max="10000000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </div>
      <div>
        <label>Interest Rate: {rate}%</label>
        <input type="range" min="5" max="15" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
      </div>
      <div>
        <label>Tenure: {years} years</label>
        <input type="range" min="1" max="30" value={years} onChange={(e) => setYears(Number(e.target.value))} />
      </div>
      <button onClick={calculateEMI} style={styles.button}>Calculate EMI</button>
      {emi && <h4>Monthly EMI: ₹{emi.toLocaleString()}</h4>}
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    margin: '1rem 0'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default EMICalculator;