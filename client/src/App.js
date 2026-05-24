import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile`);
            setUser(response.data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
            localStorage.removeItem('token');
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="skeleton" style={{ height: '100vh' }}></div>;
    }

    return (
        <Router>
            <Navbar user={user} setToken={setToken} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Home API_URL={API_URL} />} />
                <Route path="/properties" element={<Properties API_URL={API_URL} />} />
                <Route path="/property/:id" element={<PropertyDetail API_URL={API_URL} user={user} />} />
                <Route path="/profile" element={token ? <Profile API_URL={API_URL} user={user} setUser={setUser} /> : <Navigate to="/login" />} />
                <Route path="/dashboard" element={token && user?.role === 'agent' ? <Dashboard API_URL={API_URL} /> : <Navigate to="/" />} />
                <Route path="/login" element={!token ? <Login API_URL={API_URL} setToken={setToken} setUser={setUser} /> : <Navigate to="/" />} />
                <Route path="/register" element={!token ? <Register API_URL={API_URL} setToken={setToken} setUser={setUser} /> : <Navigate to="/" />} />
                <Route path="/contact" element={<Contact API_URL={API_URL} />} />
            </Routes>
            <Footer />
            <Toaster position="top-right" />
        </Router>
    );
}

export default App;
