const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Ensure environment variables are loaded
const { sequelize, connectDB } = require('./config/db'); // Assuming db.js is in a 'config' folder

// --- DATABASE CONNECTION ---
connectDB(); // Attempt to connect to MySQL

// --- EXPRESS APP SETUP ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---

// **CORS Configuration:** Allow requests only from specified origins
const allowedOrigins = [
  'http://localhost:3000',                 // Your local frontend development server
  'https://client-henna-three.vercel.app' // Your deployed Vercel frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    // OR allow if the origin is in the allowed list
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`CORS blocked for origin: ${origin}`); // Log blocked origins
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed request headers
}));

// Body Parsing Middleware: Allows the server to read JSON from request bodies
app.use(express.json());

// --- IMPORT ROUTE FILES ---
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


// --- API ROUTES ---
// Mount the routers at their specific base paths
app.use('/api/admin', adminRoutes);     // Handles routes like /api/admin/products
app.use('/api/payment', paymentRoutes); // Handles routes like /api/payment/orders


// --- ROOT ENDPOINT (Optional: for testing if the server is up) ---
app.get('/', (req, res) => {
  res.send('Amogham Pindi Vantalu API is running...');
});

// --- DATABASE SYNC & SERVER START ---
// Sync Sequelize models with the database.
// { alter: true } automatically updates tables to match model changes (use cautiously in production, migrations preferred).
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced successfully.');
    // Start listening for incoming requests only after DB sync is complete
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('❌ Unable to sync database:', err);
    // Exit the process if database sync fails, as the app likely can't function
    process.exit(1);
});