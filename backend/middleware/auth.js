const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

const isAgent = async (req, res, next) => {
    const User = require('../models/User');
    const user = await User.findById(req.userId);
    if (!user || (user.role !== 'agent' && user.role !== 'admin')) {
        return res.status(403).json({ message: 'Access denied. Agent only.' });
    }
    next();
};

module.exports = { auth, isAgent };
