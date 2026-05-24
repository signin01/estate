function PropertyScore({ property }) {
  // Calculate score based on property features
  let score = 60; // base score
  
  if (property.area > 1000) score += 10;
  if (property.beds >= 3) score += 10;
  if (property.baths >= 2) score += 10;
  if (property.priceNum < 10000000) score += 10;
  if (property.priceNum > 30000000) score += 5;
  
  score = Math.min(score, 100);
  
  const getScoreColor = () => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };
  
  const getScoreText = () => {
    if (score >= 80) return 'Excellent Investment! 🎉';
    if (score >= 60) return 'Good Value 👍';
    return 'Fair Price 💰';
  };

  return (
    <div style={{
      backgroundColor: '#f9f9f9',
      padding: '15px',
      borderRadius: '10px',
      textAlign: 'center',
      marginBottom: '20px'
    }}>
      <h3>Property Score</h3>
      <div style={{ fontSize: '48px', fontWeight: 'bold', color: getScoreColor() }}>
        {score}%
      </div>
      <div style={{ 
        width: '100%', 
        backgroundColor: '#ddd', 
        borderRadius: '10px',
        margin: '10px 0',
        overflow: 'hidden'
      }}>
        <div style={{
          width: ${score}%,
          height: '10px',
          backgroundColor: getScoreColor(),
          transition: 'width 1s ease'
        }}></div>
      </div>
      <p style={{ fontWeight: 'bold', color: getScoreColor() }}>{getScoreText()}</p>
    </div>
  );
}

export default PropertyScore;
