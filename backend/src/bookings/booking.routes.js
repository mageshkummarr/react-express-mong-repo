const express = require('express');
const router = express.Router();
const controller = require('./booking.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const permit = require('../middlewares/role.middleware');
const ROLES = require('../constants/roles');
const { validateBooking } = require('./booking.validator');

// User books a flight
router.post('/book', authMiddleware, permit(ROLES.USER, ROLES.ADMIN), validateBooking, controller.bookFlight);

// User views own bookings
router.get('/my-bookings', authMiddleware, permit(ROLES.ADMIN, ROLES.USER), controller.getMyBookings);

// Admin views all bookings
router.get('/all-bookings', authMiddleware, permit(ROLES.ADMIN), controller.getAllBookings);

module.exports = router;