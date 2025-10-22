const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 10578,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      // CRITICAL: Add UTF-8 charset for Telugu/Unicode support
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    // Define default charset for all models
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      timestamps: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connected with UTF-8 support...');
    
    // Set connection charset immediately after connecting
    await sequelize.query("SET NAMES 'utf8mb4'");
    await sequelize.query("SET CHARACTER SET utf8mb4");
    console.log('✅ UTF-8mb4 encoding set for connection');
    
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };