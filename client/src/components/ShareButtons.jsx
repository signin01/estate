import React from 'react';
import { FaWhatsapp, FaFacebook, FaTwitter, FaEnvelope, FaLink } from 'react-icons/fa';
import toast from 'react-hot-toast';

function ShareButtons({ property }) {
    const shareOnWhatsApp = () => {
        const text = `Check out this property: ${property.title}\nPrice: Rs. ${property.price.toLocaleString()}\nLocation: ${property.location.city}\nView more: ${window.location.href}`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const shareOnFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
    };

    const shareOnTwitter = () => {
        const text = `Check out this amazing property: ${property.title}`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
    };

    const shareByEmail = () => {
        const subject = `Property: ${property.title}`;
        const body = `Check out this property: ${property.title}\nPrice: Rs. ${property.price.toLocaleString()}\nLocation: ${property.location.city}\nView here: ${window.location.href}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
    };

    return (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '15px' }}>
            <button onClick={shareOnWhatsApp} style={{ background: '#25D366', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaWhatsapp /> WhatsApp
            </button>
            <button onClick={shareOnFacebook} style={{ background: '#1877F2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaFacebook /> Facebook
            </button>
            <button onClick={shareOnTwitter} style={{ background: '#1DA1F2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaTwitter /> Twitter
            </button>
            <button onClick={shareByEmail} style={{ background: '#EA4335', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaEnvelope /> Email
            </button>
            <button onClick={copyLink} style={{ background: '#666', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaLink /> Copy Link
            </button>
        </div>
    );
}

export default ShareButtons;
