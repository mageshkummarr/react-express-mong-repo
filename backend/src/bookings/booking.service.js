const repo = require('./booking.repository');
const AppError = require('../utils/AppError');
const ERROR_CODES = require('../constants/errorCodes');
const BAD_REQUEST = require('../constants/statusCodes');
 
const createBooking = async (user, flight, bookedFor) => {
      
  const today = new Date();
  today.setHours(0, 0, 0, 0);
 
  const parsedDate  = new Date(bookedFor);
  parsedDate.setHours(0, 0, 0, 0); // normalize time to midnight
  if (parsedDate  <= today) {
    throw new AppError('Booking date must be in the future', BAD_REQUEST, ERROR_CODES.INVALID_DATE);
  }
 
  //  const existingBooking = await repo.findBookingByUserFlightAndDate(userId, flightId, parsedDate);
  // if (existingBooking) {
  //   throw new AppError('You have already booked this flight for the selected date', BAD_REQUEST, ERROR_CODES.BAD_REQUEST);
  // }
 
  const newBooking = {
    user,
    flight,
    bookedFor: parsedDate
  };
 
  return await repo.createBooking(newBooking);
};
 
const getBookingsByUser = async (userId) => {
  return await repo.getBookingsByUser(userId);
};
 
const getAllBookings = async () => {
  return await repo.findAll();
};
 
module.exports = {	 	  	      	  	  			  	 	
  getBookingsByUser, createBooking, getAllBookings
};
 
 