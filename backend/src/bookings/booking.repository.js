const Booking = require('./booking.model');

exports.createBooking = async (data) => {
            
  return await Booking.create(data);
};
 
exports.getBookingsByUser = async (userId) => {
  return await Booking.find({ userId });
};
 
// exports.findBookingByUserFlightAndDate = async (userId, flightId, bookedFor) => {
//   return await Booking.findOne({ userId, flightId, bookedFor });
// };
 
exports.findAll = async () => {
    return await Booking.find().populate('flight').populate('user', 'name email');
};
 
 
 