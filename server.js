const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');

// --- DATABASE CONNECTION ---
connectDB();

// --- EXPRESS APP SETUP ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---

// **CORS Configuration**
const allowedOrigins = [
  'http://localhost:3000',
  'https://client-henna-three.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ⭐ CRITICAL FIX: UTF-8 Support for Telugu/Unicode characters
app.use(express.json({ charset: 'utf-8' }));
app.use(express.urlencoded({ extended: true, charset: 'utf-8' }));

// ⭐ Set proper Content-Type headers for all responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// --- IMPORT ROUTE FILES ---
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// --- API ROUTES ---
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);

// --- ROOT ENDPOINT ---
app.get('/', (req, res) => {
  res.send('Amogham Pindi Vantalu API is running...');
});

// --- DATABASE SYNC & SERVER START ---
sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('❌ Unable to sync database:', err);
    process.exit(1);
});