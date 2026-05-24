import React, { useState, useEffect } from 'react';
import { FaChartLine, FaBuilding, FaUsers, FaEye } from 'react-icons/fa';

function Dashboard({ API_URL }) {
    const [stats, setStats] = useState({ totalProperties: 0, totalViews: 0, totalBookings: 0 });
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await fetch(`${API_URL}/properties`);
            const data = await response.json();
            setProperties(data.properties || []);
            setStats({
                totalProperties: data.properties?.length || 0,
                totalViews: data.properties?.reduce((sum, p) => sum + (p.views || 0), 0) || 0,
                totalBookings: 0
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="skeleton" style={{ height: '400px', margin: '40px' }}></div>;
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <h1 style={{ marginBottom: '30px' }}>Agent Dashboard</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div style={{ background: 'white', padding: '25px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    <FaBuilding size={40} color="#667eea" />
                    <h2>{stats.totalProperties}</h2>
                    <p>Total Properties</p>
                </div>
                <div style={{ background: 'white', padding: '25px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    <FaEye size={40} color="#667eea" />
                    <h2>{stats.totalViews}</h2>
                    <p>Total Views</p>
                </div>
                <div style={{ background: 'white', padding: '25px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    <FaChartLine size={40} color="#667eea" />
                    <h2>{stats.totalProperties * 2}</h2>
                    <p>Inquiries</p>
                </div>
                <div style={{ background: 'white', padding: '25px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    <FaUsers size={40} color="#667eea" />
                    <h2>15</h2>
                    <p>Active Buyers</p>
                </div>
            </div>
            
            <h2 style={{ marginBottom: '20px' }}>Your Properties</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                {properties.slice(0, 6).map(property => (
                    <div key={property._id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                        <img src={property.mainImage} alt={property.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                        <div style={{ padding: '15px' }}>
                            <h3>{property.title}</h3>
                            <p style={{ color: '#667eea', fontWeight: 'bold' }}>?{property.price.toLocaleString()}</p>
                            <p style={{ fontSize: '12px', color: '#666' }}>{property.location?.city}, {property.location?.state}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
