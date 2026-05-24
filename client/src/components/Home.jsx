import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Home() {
  const navigate = useNavigate();
  const [searchPincode, setSearchPincode] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    
    window.addEventListener('scroll', () => {
      setShowScrollTop(window.scrollY > 500);
    });
  }, []);

  const properties = [
    {
      id: '1',
      title: 'Commercial Office Space',
      location: 'BKC, Mumbai',
      fullAddress: 'BKC, Mumbai, Maharashtra - 400051',
      beds: 0,
      baths: 2,
      area: 2000,
      price: 'Rs. 25,000,000',
      priceNum: 25000000,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
      pincode: '400051',
      tag: 'HOT',
      featured: true,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Beachfront Villa',
      location: 'Juhu Beach, Mumbai',
      fullAddress: 'Juhu Beach, Mumbai, Maharashtra - 400049',
      beds: 5,
      baths: 4,
      area: 3500,
      price: 'Rs. 45,000,000',
      priceNum: 45000000,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
      pincode: '400049',
      tag: 'LUXURY',
      featured: true,
      rating: 4.9
    },
    {
      id: '3',
      title: 'Modern 2BHK in Bandra',
      location: 'Bandra West, Mumbai',
      fullAddress: 'Bandra West, Mumbai, Maharashtra - 400050',
      beds: 2,
      baths: 2,
      area: 1100,
      price: 'Rs. 8,500,000',
      priceNum: 8500000,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
      pincode: '400050',
      tag: 'BEST SELLER',
      featured: true,
      rating: 4.7
    },
    {
      id: '4',
      title: 'Luxury Penthouse',
      location: 'Lower Parel, Mumbai',
      fullAddress: 'Lower Parel, Mumbai - 400013',
      beds: 3,
      baths: 3,
      area: 2500,
      price: 'Rs. 35,000,000',
      priceNum: 35000000,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
      pincode: '400013',
      tag: 'NEW',
      featured: false,
      rating: 4.9
    },
    {
      id: '5',
      title: 'Suburban Family Home',
      location: 'Andheri, Mumbai',
      fullAddress: 'Andheri East, Mumbai - 400069',
      beds: 3,
      baths: 2,
      area: 1500,
      price: 'Rs. 15,000,000',
      priceNum: 15000000,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600',
      pincode: '400069',
      tag: 'FAMILY',
      featured: false,
      rating: 4.6
    },
    {
      id: '6',
      title: 'Corporate Hub',
      location: 'Andheri East, Mumbai',
      fullAddress: 'Andheri East, Mumbai - 400069',
      beds: 0,
      baths: 4,
      area: 5000,
      price: 'Rs. 75,000,000',
      priceNum: 75000000,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
      pincode: '400069',
      tag: 'PREMIUM',
      featured: false,
      rating: 4.8
    }
  ];

  const handleSearch = () => {
    if (searchPincode.trim() === '') {
      setSearchResults([]);
      return;
    }
    const results = properties.filter(prop => prop.pincode === searchPincode);
    setSearchResults(results);
  };

  const goToProperty = (id) => {
    navigate(`/property/${id}`);
  };

  const addToWishlist = (property) => {
    if (!wishlist.find(p => p.id === property.id)) {
      const newWishlist = [...wishlist, property];
      setWishlist(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      alert('Added to wishlist!');
    } else {
      alert('Property already in wishlist!');
    }
  };

  const addToCompare = (property) => {
    if (!selectedForCompare.find(p => p.id === property.id) && selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, property]);
      alert('Property added to compare!');
    } else if (selectedForCompare.length >= 3) {
      alert('You can compare up to 3 properties only!');
    } else {
      alert('Property already in comparison!');
    }
  };

  const featuredProperties = properties.filter(p => p.featured);
  const allProperties = properties;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, type: 'spring', stiffness: 100 } }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring' } }
  };

  return (
    <div style={{ backgroundColor: darkMode ? '#0a0a1a' : '#f8f9fa', minHeight: '100vh', transition: 'all 0.3s ease' }}>
      
      {/* Dark Mode Toggle */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '12px',
          borderRadius: '50%',
          backgroundColor: darkMode ? '#fff' : '#1a1a2e',
          color: darkMode ? '#333' : '#fff',
          border: 'none',
          cursor: 'pointer',
          width: '50px',
          height: '50px',
          fontSize: '22px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
        }}
      >
        {darkMode ? '☀️' : '🌙'}
      </motion.button>

      {/* Compare Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowComparison(!showComparison)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '15px 25px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
        }}
      >
        Compare Properties
      </motion.button>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 1000,
            padding: '15px',
            borderRadius: '50%',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
          }}
        >
          ↑
        </motion.button>
      )}

      {/* Comparison Modal */}
      {showComparison && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.95)',
          zIndex: 2000,
          overflow: 'auto',
          padding: '20px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: darkMode ? '#1a1a2e' : 'white', borderRadius: '15px', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ color: darkMode ? '#fff' : '#333' }}>Compare Properties</h2>
              <button onClick={() => setShowComparison(false)} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px' }}>Close</button>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, border: '1px solid ' + (darkMode ? '#333' : '#ddd'), padding: '15px', borderRadius: '10px' }}>
                <h3>Available Properties</h3>
                {allProperties.map(prop => (
                  <button
                    key={prop.id}
                    onClick={() => addToCompare(prop)}
                    disabled={selectedForCompare.find(p => p.id === prop.id)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '12px',
                      margin: '8px 0',
                      backgroundColor: selectedForCompare.find(p => p.id === prop.id) ? '#ccc' : '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {prop.title}
                  </button>
                ))}
              </div>

              <div style={{ flex: 2 }}>
                {selectedForCompare.length > 0 ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                        <th style={{ padding: '12px', border: '1px solid ' + (darkMode ? '#444' : '#ddd'), textAlign: 'left' }}>Feature</th>
                        {selectedForCompare.map(prop => (
                          <th key={prop.id} style={{ padding: '12px', border: '1px solid ' + (darkMode ? '#444' : '#ddd') }}>
                            {prop.title}
                            <button onClick={() => setSelectedForCompare(selectedForCompare.filter(p => p.id !== prop.id))} style={{ marginLeft: '10px', color: '#ff6b6b', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td style={{ padding: '10px', border: '1px solid ' + (darkMode ? '#444' : '#ddd'), fontWeight: 'bold' }}>Price</td>
                        {selectedForCompare.map(prop => <td key={prop.id} style={{ padding: '10px', border: '1px solid ' + (darkMode ? '#444' : '#ddd'), color: '#667eea', fontWeight: 'bold' }}>{prop.price}</td>)}
                      </tr>
                      <tr>
                        <td style={{ padding: '10px', border: '1px solid ' + (darkMode ? '#444' : '#ddd'), fontWeight: 'bold' }}>Location</td>
                        {selectedForCompare.map(prop => <td key={prop.id} style={{ padding: '10px', border: '1px solid ' + (darkMode ? '#444' : '#ddd') }}>{prop.location}</td>)}
                      </tr>
                      <tr>
                        <td style={{ padding: '10px', border: '1px solid ' + (darkMode ? '#444' : '#ddd'), fontWeight: 'bold' }}>Beds</td>
                        {selectedForCompare.map(prop => <td key={prop.id} style={{ padding: '10px', border: '1px solid ' + (darkMode ? '#444' : '#ddd') }}>{prop.beds}</td>)}
                      </tr>
                      <tr>
                        <td style={{ padding: '10px', border: '1px solid ' + (darkMode ? '#444' : '#ddd'), fontWeight: 'bold' }}>Baths</td>
                        {selectedForCompare.map(prop => <td key={prop.id} style={{ padding: '10px', border: '1px solid ' + (darkMode ? '#444' : '#ddd') }}>{prop.baths}</td>)}
                      </tr>
                      <tr>
                        <td style={{ padding: '10px', border: '1px solid ' + (darkMode ? '#444' : '#ddd'), fontWeight: 'bold' }}>Area</td>
                        {selectedForCompare.map(prop => <td key={prop.id} style={{ padding: '10px', border: '1px solid ' + (darkMode ? '#444' : '#ddd') }}>{prop.area} sqft</td>)}
                      </tr>
                      <tr>
                        <td style={{ padding: '10px', border: '1px solid ' + (darkMode ? '#444' : '#ddd'), fontWeight: 'bold' }}>Rating</td>
                        {selectedForCompare.map(prop => <td key={prop.id} style={{ padding: '10px', border: '1px solid ' + (darkMode ? '#444' : '#ddd'), color: '#ffc107' }}>{'⭐'.repeat(Math.floor(prop.rating))} {prop.rating}</td>)}
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Select properties from the left to compare (max 3)</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        style={{
          background: darkMode 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '80px 20px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <motion.h1 
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: '56px', marginBottom: '15px' }}
        >
          Find Your Dream Home
        </motion.h1>
        <p style={{ fontSize: '20px', marginBottom: '40px', opacity: 0.95 }}>
          Discover the best properties across India with AI-powered recommendations
        </p>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Search by Pincode (400049, 400050...)"
            value={searchPincode}
            onChange={(e) => setSearchPincode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              padding: '16px 25px',
              width: '350px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              outline: 'none'
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            style={{
              padding: '16px 45px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            Search Now
          </motion.button>
        </div>

        <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['400049', '400050', '400051', '400013', '400069'].map(pin => (
            <motion.button
              key={pin}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSearchPincode(pin);
                handleSearch();
              }}
              style={{
                padding: '8px 20px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {pin}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ marginTop: '50px' }}
            >
              <h3>Found {searchResults.length} property(ies) in pincode {searchPincode}</h3>
              <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
                {searchResults.map(prop => (
                  <motion.div
                    key={prop.id}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onClick={() => goToProperty(prop.id)}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      width: '320px',
                      cursor: 'pointer',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                    }}
                  >
                    <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ padding: '20px', textAlign: 'left' }}>
                      <h3 style={{ color: '#667eea', marginBottom: '8px' }}>{prop.title}</h3>
                      <p style={{ color: '#666', marginBottom: '8px' }}>{prop.fullAddress}</p>
                      <p style={{ marginBottom: '8px' }}>{prop.beds} Beds | {prop.baths} Baths</p>
                      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>{prop.price}</p>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        <button onClick={(e) => { e.stopPropagation(); addToWishlist(prop); }} style={{ padding: '8px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>Wishlist</button>
                        <button onClick={(e) => { e.stopPropagation(); addToCompare(prop); }} style={{ padding: '8px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>Compare</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 20px',
          textAlign: 'center'
        }}
      >
        {[
          { number: '500+', label: 'Happy Customers', icon: '😊' },
          { number: '1000+', label: 'Properties Sold', icon: '🏠' },
          { number: '50+', label: 'Luxury Villas', icon: '✨' },
          { number: '24/7', label: 'Customer Support', icon: '💬' }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: idx * 0.1, type: 'spring' }}
            viewport={{ once: true }}
            style={{
              backgroundColor: darkMode ? '#1a1a2e' : 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ fontSize: '48px' }}>{stat.icon}</div>
            <h2 style={{ fontSize: '42px', color: '#667eea', margin: '10px 0' }}>{stat.number}</h2>
            <p style={{ color: darkMode ? '#ccc' : '#666' }}>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Featured Properties Section */}
      <div style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '50px', fontSize: '42px', color: darkMode ? '#fff' : '#333' }}
        >
          Featured Properties
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '40px' }}
        >
          {featuredProperties.map(prop => (
            <motion.div
              key={prop.id}
              variants={cardVariants}
              whileHover={{ y: -15, scale: 1.02 }}
              style={{
                backgroundColor: darkMode ? '#1a1a2e' : 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                position: 'relative'
              }}
              onClick={() => goToProperty(prop.id)}
            >
              {prop.tag && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  padding: '6px 18px',
                  borderRadius: '25px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  zIndex: 1,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  {prop.tag}
                </div>
              )}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={prop.image} 
                  alt={prop.title} 
                  style={{ width: '100%', height: '280px', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ color: '#667eea', fontSize: '22px', margin: 0 }}>{prop.title}</h3>
                  <span style={{ color: '#ffc107' }}>{'⭐'.repeat(Math.floor(prop.rating))}</span>
                </div>
                <p style={{ color: darkMode ? '#ccc' : '#666', marginBottom: '12px' }}>{prop.location}</p>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', color: darkMode ? '#ccc' : '#666' }}>
                  <span>{prop.beds} Beds</span>
                  <span>{prop.baths} Baths</span>
                  <span>{prop.area} sqft</span>
                </div>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea', marginBottom: '20px' }}>{prop.price}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => { e.stopPropagation(); addToWishlist(prop); }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Wishlist
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => { e.stopPropagation(); addToCompare(prop); }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Compare
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    goToProperty(prop.id);
                  }}
                  style={{
                    marginTop: '12px',
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'transparent',
                    color: '#667eea',
                    border: '2px solid #667eea',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  View Details →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* All Properties Section */}
      <div style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto', backgroundColor: darkMode ? '#0f0f1a' : '#f0f2f5' }}>
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '50px', fontSize: '42px', color: darkMode ? '#fff' : '#333' }}
        >
          All Properties
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}
        >
          {allProperties.map(prop => (
            <motion.div
              key={prop.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              onClick={() => goToProperty(prop.id)}
              style={{
                backgroundColor: darkMode ? '#1a1a2e' : 'white',
                borderRadius: '15px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '8px' }}>{prop.title}</h3>
                <p style={{ color: darkMode ? '#ccc' : '#666', marginBottom: '8px' }}>{prop.location}</p>
                <p style={{ marginBottom: '8px' }}>{prop.beds} Beds | {prop.baths} Baths | {prop.area} sqft</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea', marginBottom: '15px' }}>{prop.price}</p>
                <p style={{ color: '#ffc107', marginBottom: '15px' }}>{'⭐'.repeat(Math.floor(prop.rating))} {prop.rating}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    goToProperty(prop.id);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  View Details →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '60px 20px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <h2 style={{ fontSize: '36px', marginBottom: '15px' }}>Get Latest Property Updates</h2>
        <p style={{ marginBottom: '30px', fontSize: '18px' }}>Subscribe to our newsletter for new listings and price drops</p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <input
            type="email"
            placeholder="Enter your email address"
            style={{
              padding: '15px 25px',
              width: '350px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '16px',
              outline: 'none'
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '15px 35px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Subscribe Now
          </motion.button>
        </div>
      </motion.div>

      {/* Footer */}
      <footer style={{ backgroundColor: darkMode ? '#0a0a1a' : '#1a1a2e', color: 'white', padding: '60px 20px 30px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>RealEstate</h3>
            <p>Find your dream home with us. We provide the best real estate properties across India.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <p>About Us</p>
            <p>Properties</p>
            <p>Contact Us</p>
            <p>Privacy Policy</p>
          </div>
          <div>
            <h4>Contact Info</h4>
            <p>📞 +91 98765 43210</p>
            <p>✉️ info@realestate.com</p>
            <p>📍 Mumbai, India</p>
          </div>
          <div>
            <h4>Follow Us</h4>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>LinkedIn</p>
          </div>
        </div>
        <hr style={{ margin: '30px 0 20px', borderColor: '#333' }} />
        <p style={{ textAlign: 'center' }}>© 2024 RealEstate. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
