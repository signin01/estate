import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaHeart, FaBookmark } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PropertyCard from '../components/PropertyCard';

function Profile({ API_URL, user, setUser }) {
    const [savedProperties, setSavedProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '' });

    useEffect(() => {
        fetchSavedProperties();
        fetchBookings();
        if (user) {
            setFormData({ name: user.name || '', phone: user.phone || '' });
        }
    }, [user]);

    const fetchSavedProperties = async () => {
        try {
            const response = await fetch(`${API_URL}/saved-properties`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            setSavedProperties(data.properties || []);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await fetch(`${API_URL}/bookings/my-bookings`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            setBookings(data.bookings || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch(`${API_URL}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                setUser(data.user);
                setEditing(false);
                toast.success('Profile updated!');
            }
        } catch (error) {
            toast.error('Update failed');
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                {/* Sidebar */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '30px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '80px', background: '#667eea', width: '120px', height: '120px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white' }}>
                        <FaUser size={50} />
                    </div>
                    {!editing ? (
                        <>
                            <h2>{user?.name}</h2>
                            <p style={{ color: '#666' }}><FaEnvelope /> {user?.email}</p>
                            <p style={{ color: '#666' }}><FaPhone /> {user?.phone || 'Not provided'}</p>
                            <button onClick={() => setEditing(true)} className="btn-secondary" style={{ marginTop: '20px' }}>Edit Profile</button>
                        </>
                    ) : (
                        <div>
                            <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            <button onClick={handleUpdateProfile} className="btn-primary" style={{ marginRight: '10px' }}>Save</button>
                            <button onClick={() => setEditing(false)} className="btn-secondary">Cancel</button>
                        </div>
                    )}
                    <hr style={{ margin: '20px 0' }} />
                    <p><strong>Member since</strong><br />{new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
                
                {/* Main Content */}
                <div>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '25px', marginBottom: '30px' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}><FaHeart color="#e91e63" /> Saved Properties ({savedProperties.length})</h3>
                        {savedProperties.length === 0 ? (
                            <p>No saved properties yet</p>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                                {savedProperties.map(prop => (
                                    <PropertyCard key={prop._id} property={prop} />
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div style={{ background: 'white', borderRadius: '16px', padding: '25px' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}><FaBookmark /> Scheduled Visits ({bookings.length})</h3>
                        {bookings.length === 0 ? (
                            <p>No scheduled visits</p>
                        ) : (
                            bookings.map(booking => (
                                <div key={booking._id} style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong>{booking.property?.title}</strong><br />
                                        <small><FaCalendar /> {new Date(booking.visitDate).toLocaleDateString()}</small>
                                    </div>
                                    <span style={{ background: booking.status === 'pending' ? '#ff9800' : '#4caf50', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
                                        {booking.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
