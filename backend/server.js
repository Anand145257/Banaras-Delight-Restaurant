const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Route files
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const reservationRoutes = require('./routes/reservations');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');
const adminMenuRoutes = require('./routes/adminMenu');

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/admin/menu', adminMenuRoutes);

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Banaras Delight API is running');
});

const errorHandler = require('./middleware/error');

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
