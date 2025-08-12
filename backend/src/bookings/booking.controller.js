const service = require('./booking.service');
const { OK, CREATED } = require('../constants/statusCodes');
 
exports.bookFlight = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { flight, bookedFor } = req.body;
 
    const booking = await service.createBooking(user, flight, bookedFor);
 
    res.status(CREATED).json({
      status: 'success',
      data: booking
    });
  } catch (err) {
    next(err);
  }
};
 
exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await service.getBookingsByUser(req.user.userId);
    res.status(OK).json({
      status: 'success',
      data: bookings
    });
  } catch (err) {
    next(err);
  }
};
 
 
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await service.getAllBookings();
    res.status(OK).json({
      status: 'success',
      data: bookings
    });
  } catch (err) {	 	  	      	  	  			  	 	
    next(err);
  }
};