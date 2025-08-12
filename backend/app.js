const express = require('express');
const app = express();
const flightRoutes = require('./src/flights/flight.routes');
const errorHandler = require('./src/middlewares/error.middleware');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/users/auth.routes');
const bookingRoutes = require('./src/bookings/booking.routes');
const cors = require('cors');
// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  credentials: true               // Allow cookies (JWT in httpOnly cookie)
}));

// Routes
app.use('/api/flights', flightRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;
