import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Register({ API_URL, setToken, setUser }) {  // Accept API_URL prop
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'buyer'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ FIXED: Use API_URL prop instead of hardcoded URL
      const response = await axios.post(`${API_URL}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role
      });

      console.log('Registration response:', response.data);

      if (response.data.success) {
        // Save token and user data
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);
        
        // Show success message
        toast.success('Registration successful!');
        
        // Redirect to home page
        navigate('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response) {
        toast.error(error.response.data.message || 'Registration failed');
      } else if (error.request) {
        toast.error('Cannot connect to server. Make sure backend is running on port 5002');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container" style={{maxWidth: '400px', margin: '50px auto', padding: '20px'}}>
      <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px'}}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px'}}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px'}}
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px'}}
          />
        </div>
        <div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px'}}
          >
            <option value="buyer">Buyer</option>
            <option value="renter">Renter</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{width: '100%', padding: '14px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px'}}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p style={{marginTop: '20px', textAlign: 'center'}}>
        Already have an account? <a href="/login" style={{color: '#667eea'}}>Login</a>
      </p>
    </div>
  );
}

export default Register;