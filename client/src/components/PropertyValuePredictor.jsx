import { useState } from 'react';

function PropertyValuePredictor({ property }) {
  const [predictedValue, setPredictedValue] = useState(null);
  const [showPredictor, setShowPredictor] = useState(false);

  const calculatePredictedValue = () => {
    let predictedPrice = property.priceNum;
    
    if (property.area > 2000) predictedPrice *= 1.2;
    else if (property.area > 1000) predictedPrice *= 1.1;
    
    if (property.beds >= 4) predictedPrice *= 1.15;
    else if (property.beds >= 2) predictedPrice *= 1.05;
    
    const premiumLocations = ['BKC', 'Juhu', 'Bandra'];
    if (premiumLocations.some(loc => property.location.includes(loc))) {
      predictedPrice *= 1.25;
    }
    
    const appreciation = 1 + (Math.random() * 0.1);
    predictedPrice *= appreciation;
    
    const year1 = Math.round(predictedPrice);
    const year2 = Math.round(year1 * 1.08);
    const year3 = Math.round(year2 * 1.07);
    const year4 = Math.round(year3 * 1.06);
    const year5 = Math.round(year4 * 1.05);
    
    setPredictedValue({
      current: year1,
      year1: year1,
      year2: year2,
      year3: year3,
      year4: year4,
      year5: year5
    });
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return '₹' + (price / 10000000).toFixed(2) + ' Cr';
    } else if (price >= 100000) {
      return '₹' + (price / 100000).toFixed(2) + ' L';
    }
    return '₹' + price.toLocaleString();
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={() => {
          setShowPredictor(!showPredictor);
          if (!predictedValue) calculatePredictedValue();
        }}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}
      >
        Property Value Predictor (5 Years)
      </button>

      {showPredictor && predictedValue && (
        <div style={{
          backgroundColor: '#e8f5e9',
          padding: '20px',
          borderRadius: '10px',
          marginTop: '10px'
        }}>
          <h4 style={{ marginBottom: '15px', color: '#2e7d32' }}>AI-Powered Value Prediction</h4>
          
          <div style={{ marginBottom: '15px' }}>
            <p><strong>Current Estimated Value:</strong> <span style={{ fontSize: '20px', color: '#667eea' }}>{formatPrice(predictedValue.current)}</span></p>
          </div>

          <div style={{
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '15px'
          }}>
            <p style={{ color: 'white', marginBottom: '10px' }}><strong>5-Year Projection:</strong></p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
              <div>Year 1<br/>{formatPrice(predictedValue.year1)}</div>
              <div>Year 2<br/>{formatPrice(predictedValue.year2)}</div>
              <div>Year 3<br/>{formatPrice(predictedValue.year3)}</div>
              <div>Year 4<br/>{formatPrice(predictedValue.year4)}</div>
              <div>Year 5<br/>{formatPrice(predictedValue.year5)}</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px' }}>
            <p style={{ fontSize: '14px', color: '#666' }}>
              <strong>ROI Projection:</strong> {(predictedValue.year5 / property.priceNum * 100 - 100).toFixed(1)}% growth in 5 years
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyValuePredictor;
