import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBuilding, FaUser, FaPhone, FaSignOutAlt, FaChartLine } from 'react-icons/fa';
import toast from 'react-hot-toast';

function Navbar({ user, setToken, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        toast.success('Logged out successfully');
        navigate('/');
    };

    return (
        <nav style={{ background: 'white', padding: '15px 40px', boxShadow: '0 2px 20px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 style={{ fontSize: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>RealEstate</h1>
                </Link>
                <div style={{ display: 'flex', gap: '25px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '5px' }}><FaHome /> Home</Link>
                    <Link to="/properties" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '5px' }}><FaBuilding /> Properties</Link>
                    <Link to="/contact" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '5px' }}><FaPhone /> Contact</Link>
                    {user ? (
                        <>
                            <Link to="/profile" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '5px' }}><FaUser /> Profile</Link>
                            {user.role === 'agent' && (
                                <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '5px' }}><FaChartLine /> Dashboard</Link>
                            )}
                            <button onClick={handleLogout} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><FaSignOutAlt /> Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ background: '#667eea', color: 'white', padding: '8px 25px', borderRadius: '25px', textDecoration: 'none' }}>Login</Link>
                            <Link to="/register" style={{ border: '2px solid #667eea', color: '#667eea', padding: '8px 25px', borderRadius: '25px', textDecoration: 'none' }}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
