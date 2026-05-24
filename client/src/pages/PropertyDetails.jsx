import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropertyValuePredictor from '../components/PropertyValuePredictor';
import RentalYieldCalculator from '../components/RentalYieldCalculator';
import NeighborhoodSafetyScore from '../components/NeighborhoodSafetyScore';

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEMI, setShowEMI] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emi, setEmi] = useState(null);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [priceAlert, setPriceAlert] = useState(false);

  const allProperties = {
    '1': {
      title: 'Commercial Office Space',
      location: 'BKC, Mumbai',
      fullAddress: 'BKC, Mumbai, Maharashtra - 400051',
      beds: 0,
      baths: 2,
      area: 2000,
      price: 'Rs. 25,000,000',
      priceNum: 25000000,
      type: 'Commercial Office',
      description: 'Prime commercial office space in the heart of BKC. Perfect for corporate offices with modern amenities and excellent connectivity.',
      amenities: ['Central AC', 'High Speed Elevators', '24/7 Security', 'Parking', 'Conference Rooms', 'Cafeteria'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
      addressDetails: 'BKC, Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      nearby: ['Airport: 2km', 'Shopping Mall: 500m', 'Restaurants: 100m']
    },
    '2': {
      title: 'Beachfront Villa',
      location: 'Juhu Beach, Mumbai',
      fullAddress: 'Juhu Beach, Mumbai, Maharashtra - 400049',
      beds: 5,
      baths: 4,
      area: 3500,
      price: 'Rs. 45,000,000',
      priceNum: 45000000,
      type: 'villa',
      description: 'Luxury villa with stunning sea view. Experience beachfront living at its finest.',
      amenities: ['Private Pool', 'Garden', 'Parking', 'Security', 'Beach Access', 'Jacuzzi'],
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
      addressDetails: 'Juhu Beach',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400049',
      nearby: ['Beach: 50m', 'Sea View Restaurant: 200m', '5-Star Hotel: 1km']
    },
    '3': {
      title: 'Modern 2BHK in Bandra',
      location: 'Bandra West, Mumbai',
      fullAddress: 'Bandra West, Mumbai, Maharashtra - 400050',
      beds: 2,
      baths: 2,
      area: 1100,
      price: 'Rs. 8,500,000',
      priceNum: 8500000,
      type: 'Apartment',
      description: 'Modern 2BHK apartment in the heart of Bandra. Close to shopping, restaurants, and entertainment.',
      amenities: ['Gym', 'Swimming Pool', 'Parking', 'Security', 'Children\'s Play Area'],
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
      addressDetails: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      nearby: ['Bollywood Studios: 1km', 'Linking Road: 500m', 'Restaurants: 200m']
    }
  };

  const property = allProperties[id];

  if (!property) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Property not found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / (12 * 100);
    const N = parseFloat(loanTenure) * 12;
    if (P && R && N) {
      const emiValue = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
      setEmi(Math.round(emiValue));
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const setPriceDropAlert = () => {
    localStorage.setItem(lert_, 'true');
    setPriceAlert(true);
    alert('You will be notified when price drops!');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <button 
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '30px',
          fontSize: '16px'
        }}
      >
        ← Back to Properties
      </button>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* Left Column */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <img src={property.image} alt={property.title} style={{ width: '100%', borderRadius: '15px' }} />
          
          {/* Virtual Tour Button */}
          <button
            onClick={() => setShowVirtualTour(!showVirtualTour)}
            style={{
              marginTop: '15px',
              padding: '12px',
              width: '100%',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {showVirtualTour ? 'Close Virtual Tour' : 'Start Virtual Tour'}
          </button>

          {showVirtualTour && (
            <div style={{ marginTop: '15px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
              <h3>360° Virtual Tour</h3>
              <p>Interactive 3D view coming soon!</p>
              <div style={{ fontSize: '50px' }}>🏠</div>
              <p>Click and drag to explore this property in 3D</p>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: 2 }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#333' }}>{property.title}</h1>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}>{property.fullAddress}</p>
          
          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <button onClick={copyLink} style={{ padding: '8px 15px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Share</button>
            <button onClick={copyLink} style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Copy Link</button>
            <button onClick={() => setShowEMI(!showEMI)} style={{ padding: '8px 15px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>EMI Calculator</button>
            <button onClick={setPriceDropAlert} style={{ padding: '8px 15px', backgroundColor: priceAlert ? '#ccc' : '#ffc107', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              {priceAlert ? 'Alert Set' : 'Set Price Alert'}
            </button>
          </div>

          {/* Property Value Predictor */}
          <PropertyValuePredictor property={property} />

          {/* Price */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#667eea', marginBottom: '5px' }}>{property.price}</p>
            <p style={{ color: '#666' }}>Price</p>
          </div>

          {/* EMI Calculator */}
          {showEMI && (
            <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
              <h3>EMI Calculator</h3>
              <input type="number" placeholder="Loan Amount (₹)" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} style={{ width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '5px' }} />
              <input type="number" placeholder="Interest Rate (%)" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} style={{ width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '5px' }} />
              <input type="number" placeholder="Tenure (Years)" value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} style={{ width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '5px' }} />
              <button onClick={calculateEMI} style={{ padding: '10px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', marginTop: '10px' }}>Calculate EMI</button>
              {emi && <h4 style={{ marginTop: '10px' }}>Monthly EMI: ₹{emi.toLocaleString()}</h4>}
            </div>
          )}

          {/* Specifications */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '20px 0', marginBottom: '20px' }}>
            <div><strong>{property.beds}</strong><br/>Bedrooms</div>
            <div><strong>{property.baths}</strong><br/>Bathrooms</div>
            <div><strong>{property.area}</strong><br/>Area (sqft)</div>
            <div><strong>{property.type}</strong><br/>Type</div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Description</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>{property.description}</p>
          </div>

          {/* Amenities */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Amenities</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {property.amenities.map((item, idx) => (
                <span key={idx} style={{ backgroundColor: '#e9ecef', padding: '5px 15px', borderRadius: '20px', fontSize: '14px' }}>✓ {item}</span>
              ))}
            </div>
          </div>

          {/* Nearby Places */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Nearby Places</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {property.nearby.map((place, idx) => (
                <span key={idx} style={{ backgroundColor: '#e3f2fd', padding: '5px 15px', borderRadius: '20px', fontSize: '14px' }}>{place}</span>
              ))}
            </div>
          </div>

          {/* Rental Yield Calculator */}
          <RentalYieldCalculator />

          {/* Neighborhood Safety Score */}
          <NeighborhoodSafetyScore location={property.location} />

          {/* Location Information */}
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
            <h3>Location Information</h3>
            <p><strong>Address Details</strong><br />Address: {property.addressDetails}</p>
            <p><strong>City</strong><br />{property.city}</p>
            <p><strong>State</strong><br />{property.state}</p>
            <p><strong>Pincode</strong><br />{property.pincode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
