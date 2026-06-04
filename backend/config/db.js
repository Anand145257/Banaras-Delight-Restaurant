const mongoose = require('mongoose');
const path = require('path');

// Disable buffering to fail fast if disconnected
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  let conn;
  try {
    console.log(`Connecting to MongoDB at ${process.env.MONGO_URI}...`);
    conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Local MongoDB connection failed: ${error.message}`);
    console.warn('Starting in-memory MongoDB Server fallback...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create({
        binary: {
          version: '4.0.25'
        }
      });
      const mongoUri = mongoServer.getUri();
      
      conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`In-memory MongoDB Connected: ${conn.connection.host}`);
    } catch (memError) {
      console.error(`Failed to start in-memory MongoDB: ${memError.message}`);
      return;
    }
  }

  // Set up connection event handlers
  mongoose.connection.on('error', err => {
    console.error(`MongoDB connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting to reconnect...');
  });

  // Auto-seed admin user and menu items
  try {
    const User = require('../models/User');
    const FoodItem = require('../models/FoodItem');
    const fallbackData = require('./fallbackData');

    // 1. Seed Admin User if not exists
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount === 0) {
      await User.create({
        name: 'Banaras Delight Admin',
        email: 'admin@goldenwhisk.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Default admin user created (admin@goldenwhisk.com / admin123)');
    }

    // 2. Seed Menu Items if not exists
    const menuCount = await FoodItem.countDocuments();
    if (menuCount === 0) {
      const conversionMap = {
        12: 299,
        15: 349,
        20: 499
      };
      
      const inrMenuItems = fallbackData.map(item => {
        const usdPrice = Number(item.price);
        const inrPrice = conversionMap[usdPrice] || Math.round(usdPrice * 25);
        return {
          ...item,
          price: inrPrice,
          isAvailable: item.isAvailable !== undefined ? item.isAvailable : true
        };
      });

      await FoodItem.insertMany(inrMenuItems);
      console.log(`✅ ${inrMenuItems.length} menu items auto-seeded successfully with INR prices`);
    }
  } catch (seedError) {
    console.error(`Error auto-seeding database: ${seedError.message}`);
  }
};

module.exports = connectDB;
