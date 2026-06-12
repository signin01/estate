import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function Login({ API_URL, setToken, setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // ✅ CORRECT ENDPOINT
            const response = await axios.post(`${API_URL}/login`, { email, password });
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            setUser(response.data.user);
            toast.success('Login successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '450px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Welcome Back</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Login to your account</p>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                        <div style={{ position: 'relative' }}>
                            <FaEnvelope style={{ position: 'absolute', left: '15px', top: '15px', color: '#999' }} />
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                style={{ width: '100%', padding: '12px 15px 12px 45px', border: '1px solid #ddd', borderRadius: '10px' }} 
                                required 
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <FaLock style={{ position: 'absolute', left: '15px', top: '15px', color: '#999' }} />
                            <input 
                                type="password" 
                                placeholder="Enter your password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                style={{ width: '100%', padding: '12px 15px 12px 45px', border: '1px solid #ddd', borderRadius: '10px' }} 
                                required 
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="btn-primary" 
                        style={{ width: '100%', padding: '14px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    Don't have an account? <Link to="/register" style={{ color: '#667eea' }}>Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;