const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  teluguName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('Sweets', 'Snacks', 'Spice Powders', 'Pickles'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  teluguDescription: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  basePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  price250g: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  price500g: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  price1kg: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '1KG'
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;