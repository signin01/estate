import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
        <footer style={{ background: '#1a1a2e', color: 'white', padding: '40px 20px 20px', marginTop: '60px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                <div>
                    <h3>RealEstate</h3>
                    <p>Find your dream home with us. We provide the best real estate properties across India.</p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <p>About Us</p>
                    <p>Properties</p>
                    <p>Contact Us</p>
                    <p>Privacy Policy</p>
                </div>
                <div>
                    <h4>Contact Info</h4>
                    <p>Phone: +91 98765 43210</p>
                    <p>Email: info@realestate.com</p>
                    <p>Address: Mumbai, India</p>
                </div>
                <div>
                    <h4>Follow Us</h4>
                    <div style={{ display: 'flex', gap: '15px', fontSize: '24px' }}>
                        <FaFacebook style={{ cursor: 'pointer' }} />
                        <FaTwitter style={{ cursor: 'pointer' }} />
                        <FaInstagram style={{ cursor: 'pointer' }} />
                        <FaLinkedin style={{ cursor: 'pointer' }} />
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', paddingTop: '30px', marginTop: '30px', borderTop: '1px solid #333' }}>
                <p>2024 RealEstate. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
