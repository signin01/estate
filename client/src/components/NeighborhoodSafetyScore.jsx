import { useState } from 'react';

function NeighborhoodSafetyScore({ location }) {
  const [showSafety, setShowSafety] = useState(false);
  
  const getSafetyData = (loc) => {
    const safetyMap = {
      'BKC': { score: 85, crime: 'Low', rating: 'Very Safe', color: '#28a745' },
      'Juhu': { score: 90, crime: 'Very Low', rating: 'Excellent', color: '#28a745' },
      'Bandra': { score: 88, crime: 'Low', rating: 'Very Safe', color: '#28a745' },
      'Lower Parel': { score: 75, crime: 'Moderate', rating: 'Safe', color: '#ffc107' },
      'Andheri': { score: 70, crime: 'Moderate', rating: 'Generally Safe', color: '#ffc107' }
    };
    
    for (const [key, value] of Object.entries(safetyMap)) {
      if (loc.includes(key)) {
        return value;
      }
    }
    return { score: 65, crime: 'Moderate', rating: 'Average', color: '#ffc107' };
  };
  
  const safety = getSafetyData(location);
  
  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={() => setShowSafety(!showSafety)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#17a2b8',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        Check Neighborhood Safety Score
      </button>

      {showSafety && (
        <div style={{
          marginTop: '15px',
          backgroundColor: '#e1f5fe',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <h4 style={{ marginBottom: '15px' }}>Safety Score for {location}</h4>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: safety.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              color: 'white',
              fontSize: '36px',
              fontWeight: 'bold'
            }}>
              {safety.score}
            </div>
            <p style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold', color: safety.color }}>
              {safety.rating}
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#666' }}>Crime Rate</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{safety.crime}</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#666' }}>Police Response</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>10-15 mins</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#666' }}>Street Lighting</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Excellent</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#666' }}>Neighborhood Watch</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Active</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NeighborhoodSafetyScore;
