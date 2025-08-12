import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import bookingService from '../services/bookingService';
const ViewAllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingService.getAllBookings();
        setBookings(res);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Flight Bookings
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && bookings.length === 0 && (
        <Alert severity="info">No bookings found.</Alert>
      )}

      {!loading && bookings.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Booking ID</strong></TableCell>
                <TableCell><strong>User</strong></TableCell>
                <TableCell><strong>Flight</strong></TableCell>
                <TableCell><strong>Seats</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking._id}</TableCell>
                  <TableCell>{booking.user?.name || 'N/A'}</TableCell>
                  <TableCell>{booking.flight?.flightNumber || 'N/A'}</TableCell>
                  <TableCell>{booking.seats}</TableCell>
                  <TableCell>{new Date(booking.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
export default ViewAllBookings;