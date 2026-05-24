import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';

function Contact({ API_URL }) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Message sent! We will contact you soon.');
                setFormData({ name: '', email: '', phone: '', message: '' });
            }
        } catch (error) {
            toast.error('Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Contact Us</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
                <div>
                    <h3>Get in Touch</h3>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Have questions about properties? We're here to help.</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                        <FaPhone size={24} color="#667eea" />
                        <div><strong>Phone</strong><br />+91 98765 43210</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                        <FaEnvelope size={24} color="#667eea" />
                        <div><strong>Email</strong><br />info@realestate.com</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                        <FaMapMarkerAlt size={24} color="#667eea" />
                        <div><strong>Office</strong><br />Mumbai, India</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                        <FaClock size={24} color="#667eea" />
                        <div><strong>Working Hours</strong><br />Mon-Sat: 9AM - 8PM</div>
                    </div>
                </div>
                
                <div style={{ background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '10px' }} required />
                        <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '10px' }} required />
                        <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '10px' }} />
                        <textarea placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows="5" style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '10px' }} required />
                        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '14px' }}>{loading ? 'Sending...' : 'Send Message'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
