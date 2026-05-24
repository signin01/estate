import { useState } from 'react';

function RentalYieldCalculator() {
  const [monthlyRent, setMonthlyRent] = useState('');
  const [propertyPrice, setPropertyPrice] = useState('');
  const [maintenanceCost, setMaintenanceCost] = useState('');
  const [result, setResult] = useState(null);

  const calculateYield = () => {
    const rent = parseFloat(monthlyRent);
    const price = parseFloat(propertyPrice);
    const maintenance = parseFloat(maintenanceCost) || 0;
    
    if (rent && price) {
      const annualRent = rent * 12;
      const annualMaintenance = maintenance * 12;
      const netIncome = annualRent - annualMaintenance;
      const grossYield = (annualRent / price) * 100;
      const netYield = (netIncome / price) * 100;
      
      setResult({
        grossYield: grossYield.toFixed(2),
        netYield: netYield.toFixed(2),
        monthlyProfit: (rent - maintenance).toFixed(0),
        annualProfit: netIncome.toFixed(0),
        paybackYears: (price / netIncome).toFixed(1)
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
      <h3>Rental Yield Calculator</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>Calculate your ROI from renting this property</p>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Monthly Rent (₹)</label>
        <input
          type="number"
          placeholder="e.g., 50000"
          value={monthlyRent}
          onChange={(e) => setMonthlyRent(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Property Price (₹)</label>
        <input
          type="number"
          placeholder="e.g., 45000000"
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Monthly Maintenance Cost (₹)</label>
        <input
          type="number"
          placeholder="e.g., 5000"
          value={maintenanceCost}
          onChange={(e) => setMaintenanceCost(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
        />
      </div>
      
      <button
        onClick={calculateYield}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Calculate Yield
      </button>

      {result && (
        <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>
          <h4>Investment Analysis</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#666' }}>Gross Yield</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>{result.grossYield}%</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#666' }}>Net Yield</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>{result.netYield}%</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#666' }}>Monthly Profit</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>₹{parseInt(result.monthlyProfit).toLocaleString()}</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#666' }}>Payback Period</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{result.paybackYears} years</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentalYieldCalculator;
