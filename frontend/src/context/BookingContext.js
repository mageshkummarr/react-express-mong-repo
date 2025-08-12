import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = async (values, flightDetails, searchParams) => {
    try {
      setError(null);
      setLoading(true);
      setBookingSuccess(false);

      // Create booking details
      const newBookingDetails = {
        bookingId: Math.random().toString(36).substr(2, 9),
        passengerName: values.name,
        email: values.email,
        numberOfPassengers: parseInt(values.passengers),
        totalAmount: values.passengers * flightDetails.fare,
        from: searchParams.departureCity,
        to: searchParams.arrivalCity,
        date: values.date,
        bookingDate: new Date().toLocaleDateString()
      };

      alert(`Ticket is booked!\nBooking ID: ${newBookingDetails.bookingId}`);
      setBookingDetails(newBookingDetails);
      setBookingSuccess(true);
      return newBookingDetails;

    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message);
      setBookingSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetBooking = () => {
    setBookingDetails(null);
    setBookingSuccess(false);
    setError(null);
  };

  const value = {
    bookingDetails,
    bookingSuccess,
    loading,
    error,
    createBooking,
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
