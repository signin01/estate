const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Error:', err));

// Models
const User = require('./models/User');
const Property = require('./models/Property');
const Booking = require('./models/Booking');

// Sample Properties Data
const sampleProperties = [
    { title: "Luxury Apartment in Andheri", description: "Beautiful 3BHK apartment with modern amenities", price: 12500000, area: 1500, bedrooms: 3, bathrooms: 2, propertyType: "apartment", status: "sale", location: { address: "Andheri East", city: "Mumbai", state: "Maharashtra", pincode: "400069", coordinates: { lat: 19.1136, lng: 72.8697 } }, amenities: ["Parking", "Gym", "Swimming Pool", "Security"], mainImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500", isFeatured: true },
    { title: "Modern 2BHK in Bandra", description: "Spacious apartment near Bandra station", price: 8500000, area: 1100, bedrooms: 2, bathrooms: 2, propertyType: "apartment", status: "sale", location: { address: "Bandra West", city: "Mumbai", state: "Maharashtra", pincode: "400050", coordinates: { lat: 19.0596, lng: 72.8295 } }, amenities: ["Parking", "Gym", "Security"], mainImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500" },
    { title: "Beachfront Villa", description: "Luxury villa with sea view", price: 45000000, area: 3500, bedrooms: 5, bathrooms: 4, propertyType: "villa", status: "sale", location: { address: "Juhu Beach", city: "Mumbai", state: "Maharashtra", pincode: "400049", coordinates: { lat: 19.1038, lng: 72.8257 } }, amenities: ["Private Pool", "Garden", "Parking", "Security", "Beach Access"], mainImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500", isFeatured: true },
    { title: "Commercial Office Space", description: "Prime location office space", price: 25000000, area: 2000, bedrooms: 0, bathrooms: 2, propertyType: "commercial", status: "rent", location: { address: "BKC", city: "Mumbai", state: "Maharashtra", pincode: "400051", coordinates: { lat: 19.0718, lng: 72.8652 } }, amenities: ["AC", "Parking", "Security", "Elevator"], mainImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500" }
];

// Initialize properties
Property.countDocuments().then(async (count) => {
    if (count === 0) {
        await Property.insertMany(sampleProperties);
        console.log('Sample properties initialized');
    }
});

// Auth middleware
const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// ============ AUTH ROUTES ============
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed, phone, role: role || 'user' });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token, user: { id: user._id, name, email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token, user: { id: user._id, name: user.name, email, role: user.role, phone: user.phone } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ PROPERTY ROUTES ============
app.get('/api/properties', async (req, res) => {
    try {
        const { status, propertyType, minPrice, maxPrice, bedrooms, city, search } = req.query;
        let query = {};
        if (status) query.status = status;
        if (propertyType) query.propertyType = propertyType;
        if (bedrooms) query.bedrooms = parseInt(bedrooms);
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseInt(minPrice);
            if (maxPrice) query.price.$lte = parseInt(maxPrice);
        }
        if (city) query['location.city'] = { $regex: city, $options: 'i' };
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { 'location.address': { $regex: search, $options: 'i' } },
                { 'location.city': { $regex: search, $options: 'i' } }
            ];
        }
        const properties = await Property.find(query).sort('-createdAt');
        res.json({ success: true, properties });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/properties/featured', async (req, res) => {
    try {
        const featured = await Property.find({ isFeatured: true }).limit(6);
        res.json({ success: true, featured });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/properties/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        property.views += 1;
        await property.save();
        const similar = await Property.find({ 
            propertyType: property.propertyType, 
            _id: { $ne: property._id },
            'location.city': property.location.city
        }).limit(4);
        res.json({ success: true, property, similar });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ LOCATION SEARCH ============
app.get('/api/location/search', async (req, res) => {
    try {
        const { pincode, city } = req.query;
        let query = {};
        if (pincode) query['location.pincode'] = pincode;
        if (city) query['location.city'] = { $regex: city, $options: 'i' };
        const properties = await Property.find(query);
        const locations = [...new Set(properties.map(p => ({
            pincode: p.location.pincode,
            city: p.location.city,
            state: p.location.state,
            count: properties.filter(prop => prop.location.pincode === p.location.pincode).length
        })))];
        res.json({ success: true, locations, properties });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ BOOKING ROUTES ============
app.post('/api/bookings', auth, async (req, res) => {
    try {
        const { propertyId, visitDate, message } = req.body;
        const booking = new Booking({ property: propertyId, user: req.userId, visitDate, message });
        await booking.save();
        res.json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/bookings/my-bookings', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.userId }).populate('property');
        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ USER PROFILE ============
app.get('/api/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/profile', auth, async (req, res) => {
    try {
        const { name, phone } = req.body;
        const user = await User.findByIdAndUpdate(req.userId, { name, phone }, { new: true }).select('-password');
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ SAVE PROPERTIES ============
app.post('/api/save-property/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const propertyId = req.params.id;
        if (user.savedProperties.includes(propertyId)) {
            user.savedProperties = user.savedProperties.filter(id => id.toString() !== propertyId);
        } else {
            user.savedProperties.push(propertyId);
        }
        await user.save();
        res.json({ success: true, savedProperties: user.savedProperties });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/saved-properties', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('savedProperties');
        res.json({ success: true, properties: user.savedProperties });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message, propertyId } = req.body;
        console.log('Contact inquiry:', { name, email, phone, message, propertyId });
        res.json({ success: true, message: 'Inquiry sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.json({ message: 'RealEstate API is running!' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
