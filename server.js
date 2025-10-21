const express = require('express');
const cors = require('cors');
const { sequelize, connectDB } = require('./config/db'); // Assuming db.js is in a 'config' folder

// --- SETUP ---
const app = express();
const PORT = process.env.PORT || 5000;
connectDB(); // Connect to MySQL

// --- MIDDLEWARE ---
// Allows your frontend to communicate with this backend
app.use(cors());
// Allows the server to read JSON from request bodies
app.use(express.json());

// --- IMPORT ROUTES ---
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// --- API ROUTES ---
// Any request starting with '/api/admin' will be handled by adminRoutes
app.use('/api/admin', adminRoutes);
// Any request starting with '/api/payment' will be handled by paymentRoutes
app.use('/api/payment', paymentRoutes);

// Sync all database models. This creates the tables if they don't exist.
sequelize.sync().then(() => {
    // --- START SERVER ---
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to sync database:', err);
}); 