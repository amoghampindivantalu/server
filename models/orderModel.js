// models/orderModel.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deliveryAddress: { // <-- ADDED
    type: DataTypes.TEXT,
    allowNull: false
  },
  items: { // <-- RENAMED from orderItems
    type: DataTypes.JSON,
    allowNull: false
  },
  subtotal: { // <-- ADDED
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  shippingCharge: { // <-- ADDED
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending'
  },
  paymentId: { // <-- ADDED for Razorpay
    type: DataTypes.STRING,
    allowNull: true
  },
  razorpayOrderId: { // <-- ADDED for Razorpay
    type: DataTypes.STRING,
    allowNull: true
  },
  razorpaySignature: { // <-- ADDED for Razorpay
    type: DataTypes.STRING,
    allowNull: true
  },
  paymentError: { // <-- ADDED for failed payments
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;