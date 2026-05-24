import { useState } from 'react';

function PropertyComparison({ properties, onClose }) {
  const [selectedProperties, setSelectedProperties] = useState([]);

  const addToCompare = (property) => {
    if (selectedProperties.length < 3 && !selectedProperties.find(p => p.id === property.id)) {
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  const removeFromCompare = (id) => {
    setSelectedProperties(selectedProperties.filter(p => p.id !== id));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      zIndex: 1000,
      overflow: 'auto',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', borderRadius: '15px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2>Compare Properties</h2>
          <button onClick={onClose} style={{ padding: '10px 20px', cursor: 'pointer' }}>Close ✕</button>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {/* Available Properties */}
          <div style={{ flex: 1, border: '1px solid #ddd', padding: '15px', borderRadius: '10px' }}>
            <h3>Available Properties</h3>
            {properties.map(prop => (
              <button
                key={prop.id}
                onClick={() => addToCompare(prop)}
                disabled={selectedProperties.find(p => p.id === prop.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px',
                  margin: '5px 0',
                  backgroundColor: selectedProperties.find(p => p.id === prop.id) ? '#ccc' : '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {prop.title}
              </button>
            ))}
          </div>

          {/* Comparison Table */}
          <div style={{ flex: 2 }}>
            {selectedProperties.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '10px' }}>Feature</th>
                    {selectedProperties.map(prop => (
                      <th key={prop.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
                        {prop.title}
                        <button onClick={() => removeFromCompare(prop.id)} style={{ marginLeft: '10px', color: 'red' }}>✕</button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ border: '1px solid #ddd', padding: '10px' }}>Price</td>{selectedProperties.map(prop => <td key={prop.id} style={{ border: '1px solid #ddd', padding: '10px' }}>{prop.price}</td>)}</tr>
                  <tr><td style={{ border: '1px solid #ddd', padding: '10px' }}>Location</td>{selectedProperties.map(prop => <td key={prop.id} style={{ border: '1px solid #ddd', padding: '10px' }}>{prop.location}</td>)}</tr>
                  <tr><td style={{ border: '1px solid #ddd', padding: '10px' }}>Beds</td>{selectedProperties.map(prop => <td key={prop.id} style={{ border: '1px solid #ddd', padding: '10px' }}>{prop.beds}</td>)}</tr>
                  <tr><td style={{ border: '1px solid #ddd', padding: '10px' }}>Baths</td>{selectedProperties.map(prop => <td key={prop.id} style={{ border: '1px solid #ddd', padding: '10px' }}>{prop.baths}</td>)}</tr>
                  <tr><td style={{ border: '1px solid #ddd', padding: '10px' }}>Area</td>{selectedProperties.map(prop => <td key={prop.id} style={{ border: '1px solid #ddd', padding: '10px' }}>{prop.area} sqft</td>)}</tr>
                </tbody>
              </table>
            ) : (
              <p>Select properties to compare (max 3)</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyComparison;
