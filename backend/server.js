const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'RealEstate API is running' });
});

// Import routes (uncomment when you have them)
// const authRoutes = require('./routes/auth');
// const propertyRoutes = require('./routes/properties');
// app.use('/api/auth', authRoutes);
// app.use('/api/properties', propertyRoutes);

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, '0.0.0.0', () => {
  console.log(Server running on port );
});
