import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';

function Register({ API_URL, setToken, setUser }) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', role: 'user' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // CHANGED: Removed /auth from the URL
const response = await axios.post(`${API_URL}/register`, formData);
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            setUser(response.data.user);
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Create Account</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Join us to find your dream home</p>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <div style={{ position: 'relative' }}>
                            <FaUser style={{ position: 'absolute', left: '15px', top: '15px', color: '#999' }} />
                            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '12px 15px 12px 45px', border: '1px solid #ddd', borderRadius: '10px' }} required />
                        </div>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <div style={{ position: 'relative' }}>
                            <FaEnvelope style={{ position: 'absolute', left: '15px', top: '15px', color: '#999' }} />
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '12px 15px 12px 45px', border: '1px solid #ddd', borderRadius: '10px' }} required />
                        </div>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <div style={{ position: 'relative' }}>
                            <FaPhone style={{ position: 'absolute', left: '15px', top: '15px', color: '#999' }} />
                            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '12px 15px 12px 45px', border: '1px solid #ddd', borderRadius: '10px' }} required />
                        </div>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <div style={{ position: 'relative' }}>
                            <FaLock style={{ position: 'absolute', left: '15px', top: '15px', color: '#999' }} />
                            <input type="password" name="password" placeholder="Password (min 6 characters)" value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '12px 15px 12px 45px', border: '1px solid #ddd', borderRadius: '10px' }} required />
                        </div>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: '12px 15px', border: '1px solid #ddd', borderRadius: '10px' }}>
                            <option value="user">Buyer/Renter</option>
                            <option value="agent">Real Estate Agent</option>
                        </select>
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '14px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '16px' }}>{loading ? 'Loading...' : 'Register'}</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>Already have an account? <Link to="/login" style={{ color: '#667eea' }}>Login</Link></p>
            </div>
        </div>
    );
}

export default Register;