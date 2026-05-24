import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHeart, FaCalendar, FaPhone, FaEnvelope, FaCalculator, FaWhatsapp, FaFacebook, FaTwitter, FaLink } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PropertyCard from '../components/PropertyCard';
import EMICalculator from '../components/EMICalculator';
import ShareButtons from '../components/ShareButtons';
import CompareProperties from '../components/CompareProperties';

function PropertyDetail({ API_URL, user }) {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const [showEMI, setShowEMI] = useState(false);
    const [visitDate, setVisitDate] = useState('');
    const [bookingMessage, setBookingMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            const response = await fetch(`${API_URL}/properties/${id}`);
            const data = await response.json();
            setProperty(data.property);
            setSimilar(data.similar || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProperty = async () => {
        if (!user) {
            toast.error('Please login to save properties');
            navigate('/login');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/save-property/${id}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            setSaved(!saved);
            toast.success(saved ? 'Removed from saved' : 'Property saved!');
        } catch (error) {
            toast.error('Failed to save property');
        }
    };

    const handleBooking = async () => {
        if (!user) {
            toast.error('Please login to schedule a visit');
            navigate('/login');
            return;
        }
        if (!visitDate) {
            toast.error('Please select a visit date');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ propertyId: id, visitDate, message: bookingMessage })
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Visit scheduled! We will contact you soon.');
                setShowBooking(false);
                setVisitDate('');
                setBookingMessage('');
            }
        } catch (error) {
            toast.error('Failed to schedule visit');
        }
    };

    const shareOnWhatsApp = () => {
        const text = `Check out this property: ${property?.title}\nPrice: Rs. ${property?.price?.toLocaleString()}\nLocation: ${property?.location?.city}\nView more: ${window.location.href}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
    };

    if (loading) {
        return <div className="skeleton" style={{ height: '400px', margin: '40px' }}></div>;
    }

    if (!property) {
        return <div style={{ textAlign: 'center', padding: '60px' }}>Property not found</div>;
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <img src={property.mainImage} alt={property.title} style={{ width: '100%', height: '450px', objectFit: 'cover', borderRadius: '20px', marginBottom: '30px' }} />
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                {/* Left Column */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h1 style={{ fontSize: '28px' }}>{property.title}</h1>
                        <button onClick={handleSaveProperty} style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: saved ? '#e91e63' : '#ccc' }}>
                            <FaHeart />
                        </button>
                    </div>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', marginBottom: '20px' }}>
                        <FaMapMarkerAlt /> {property.location.address}, {property.location.city}, {property.location.state} - {property.location.pincode}
                    </p>
                    
                    {/* Share Buttons */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                        <button onClick={shareOnWhatsApp} style={{ background: '#25D366', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaWhatsapp /> Share
                        </button>
                        <button onClick={copyLink} style={{ background: '#666', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaLink /> Copy Link
                        </button>
                        <button onClick={() => setShowEMI(!showEMI)} style={{ background: '#667eea', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaCalculator /> EMI Calculator
                        </button>
                    </div>
                    
                    {/* EMI Calculator */}
                    {showEMI && (
                        <div style={{ marginBottom: '30px' }}>
                            <EMICalculator />
                        </div>
                    )}
                    
                    <div style={{ display: 'flex', gap: '30px', marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '16px' }}>
                        <div><strong>Rs. {property.price.toLocaleString()}</strong><br /><small>Price</small></div>
                        <div><strong>{property.bedrooms}</strong><br /><small>Bedrooms</small></div>
                        <div><strong>{property.bathrooms}</strong><br /><small>Bathrooms</small></div>
                        <div><strong>{property.area} sqft</strong><br /><small>Area</small></div>
                        <div><strong>{property.propertyType}</strong><br /><small>Type</small></div>
                    </div>
                    
                    <h3>Description</h3>
                    <p style={{ lineHeight: '1.6', marginBottom: '30px' }}>{property.description}</p>
                    
                    <h3>Amenities</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
                        {property.amenities && property.amenities.map((amenity, i) => (
                            <span key={i} style={{ background: '#e8f5e9', padding: '5px 15px', borderRadius: '20px', fontSize: '14px' }}>{amenity}</span>
                        ))}
                    </div>
                    
                    <h3>Location Information</h3>
                    <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '16px', marginBottom: '20px', border: '1px solid #c8e6c9' }}>
                        <h4 style={{ marginBottom: '15px', color: '#2e7d32' }}>Address Details</h4>
                        <div style={{ display: 'grid', gap: '10px' }}>
                            <p><strong>Address:</strong> {property.location.address}</p>
                            <p><strong>City:</strong> {property.location.city}</p>
                            <p><strong>State:</strong> {property.location.state}</p>
                            <p><strong>Pincode:</strong> {property.location.pincode}</p>
                            <p><strong>Country:</strong> India</p>
                        </div>
                    </div>
                    
                    <div style={{ background: '#f0f0f0', height: '200px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '1px solid #ddd' }}>
                        <FaMapMarkerAlt size={48} color="#667eea" />
                        <p style={{ marginTop: '15px', textAlign: 'center' }}>
                            <strong>{property.location.address}</strong><br />
                            {property.location.city}, {property.location.state}<br />
                            Pincode: {property.location.pincode}
                        </p>
                    </div>
                </div>
                
                {/* Right Column */}
                <div>
                    <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', position: 'sticky', top: '100px' }}>
                        <h3>Interested in this property?</h3>
                        {!showBooking ? (
                            <>
                                <button onClick={() => setShowBooking(true)} className="btn-primary" style={{ width: '100%', marginBottom: '15px' }}>Schedule a Visit</button>
                                <a href="tel:+919876543210" style={{ display: 'block', textAlign: 'center', padding: '12px', background: '#25d366', color: 'white', borderRadius: '30px', textDecoration: 'none', marginBottom: '10px' }}>
                                    <FaPhone /> Call Agent
                                </a>
                                <a href="mailto:info@realestate.com" style={{ display: 'block', textAlign: 'center', padding: '12px', background: '#667eea', color: 'white', borderRadius: '30px', textDecoration: 'none' }}>
                                    <FaEnvelope /> Email Inquiry
                                </a>
                            </>
                        ) : (
                            <div>
                                <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '10px' }} />
                                <textarea placeholder="Message (optional)" value={bookingMessage} onChange={(e) => setBookingMessage(e.target.value)} rows="3" style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '10px' }}></textarea>
                                <button onClick={handleBooking} className="btn-primary" style={{ width: '100%', marginBottom: '10px' }}>Confirm Visit</button>
                                <button onClick={() => setShowBooking(false)} className="btn-secondary" style={{ width: '100%' }}>Cancel</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Compare Properties Section */}
            {similar.length > 0 && (
                <div style={{ marginTop: '60px' }}>
                    <h2 style={{ marginBottom: '30px' }}>Similar Properties</h2>
                    <CompareProperties properties={similar} />
                </div>
            )}
        </div>
    );
}

export default PropertyDetail;
