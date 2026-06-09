// client/src/components/CompareProperties.jsx
import React, { useState } from 'react';

const CompareProperties = () => {
  const [showCompare, setShowCompare] = useState(false);

  return (
    <div style={styles.container}>
      <button onClick={() => setShowCompare(!showCompare)} style={styles.button}>
        Compare Properties
      </button>
      {showCompare && (
        <div style={styles.compareBox}>
          <p>Select properties to compare (Coming Soon!)</p>
          <p>This feature will allow you to compare multiple properties side-by-side.</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: '1rem 0'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  compareBox: {
    marginTop: '1rem',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  }
};

export default CompareProperties;