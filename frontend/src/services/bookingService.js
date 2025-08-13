import axios from 'axios';

const generateBookingId = () => Math.random().toString(36).substr(2, 9);

export const createBooking = async (values, flightDetails, searchParams) => {
  const bookingDetails = {
    bookingId: generateBookingId(),
    passengerName: values.name,
    email: values.email,
    numberOfPassengers: parseInt(values.passengers),
    totalAmount: values.passengers * flightDetails.fare,
    from: searchParams.departureCity,
    to: searchParams.arrivalCity,
    date: searchParams.departureDate
  };

  // Show alert for now, can be replaced with API call later
  alert(`Ticket is booked!\nBooking ID: ${bookingDetails.bookingId}`);
  return bookingDetails;
};

const API = axios.create({
  baseURL: 'http://15.206.116.142:5000/bookings',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
const getAllBookings = async () => {
  const res = await API.get('/all-bookings');
  return res.data;
};
const bookingService = {
  getAllBookings,
};

export default bookingService;