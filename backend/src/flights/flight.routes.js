
const express = require('express');
const router = express.Router();
const controller = require('../flights/flight.controller');
const {validateFlightIdParam, validateAddFlight, validateSearchQuery} = require('../flights/flight.validator');
const authMiddleware = require('../middlewares/auth.middleware');
const permit = require('../middlewares/role.middleware');
const ROLES = require('../constants/roles');

router.post('/search', authMiddleware, permit(ROLES.ADMIN, ROLES.USER), validateSearchQuery, controller.searchFlights); 
// Admin only
router.post('/add', authMiddleware, permit(ROLES.ADMIN), validateAddFlight, controller.createFlight);
router.put('/update/:id', authMiddleware, permit(ROLES.ADMIN), controller.updateFlight);
router.delete('/delete/:id', authMiddleware, permit(ROLES.ADMIN), controller.deleteFlight);
router.get('/all', authMiddleware, permit(ROLES.ADMIN, ROLES.USER), controller.getAllFlights);
router.get('/filter/:id', authMiddleware, permit(ROLES.ADMIN), controller.getFlightById);



module.exports = router;