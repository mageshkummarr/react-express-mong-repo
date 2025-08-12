import { Formik, Form } from 'formik';
import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Grid,
  TextField,
  InputAdornment,
  Alert,
  Paper,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { Person, Email, Group, Flight, CalendarMonth } from '@mui/icons-material';
import Button from '../components/common/Button';
import { AuthContext } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import bookingSchema from '../utils/validation/bookingSchema';

const Booking = () => {
  const { auth } = useContext(AuthContext);
  const { 
    bookingDetails, 
    bookingSuccess, 
    loading, 
    error, 
    createBooking 
  } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { flightDetails, searchParams } = location.state || {};

  if (!auth) {
    return <Alert severity="warning">Please login to book flights.</Alert>;
  }

  if (!flightDetails || !searchParams) {
    return <Alert severity="error">Please select a flight first.</Alert>;
  }

  const initialValues = {
    name: auth?.name || '',
    email: auth?.email || '',
    passengers: searchParams?.numberOfPassengers || 1,
    date: searchParams?.departureDate || new Date().toISOString().split('T')[0],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createBooking(values, flightDetails, searchParams);
    } catch (err) {
      // Error is handled by context
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Flight sx={{ mr: 1 }} />
          Flight Booking
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            From: {searchParams.departureCity} → To: {searchParams.arrivalCity}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Date: {searchParams.departureDate}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Base Fare: ₹{flightDetails.fare}
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={bookingSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Travel Date"
                    name="date"
                    type="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.date && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Number of Passengers"
                    name="passengers"
                    type="number"
                    value={values.passengers}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.passengers && Boolean(errors.passengers)}
                    helperText={touched.passengers && errors.passengers}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Group />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary">
                    Total Fare: ₹{values.passengers * flightDetails.fare}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || loading}
                  startIcon={loading && <CircularProgress size={20} />}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {loading ? 'Processing...' : 'Book Now'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>

      {bookingSuccess && bookingDetails && (
        <Paper elevation={3} sx={{ p: 3, bgcolor: '#e8f5e9', color: '#1b5e20' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#2e7d32' }}>
            ✓ Booking Successful!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Thank you, {bookingDetails.passengerName}! Your flight has been booked.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Booking ID: {bookingDetails.bookingId}
          </Typography>
          <Typography variant="body1" gutterBottom>
            From: {bookingDetails.from} → To: {bookingDetails.to}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Travel Date: {bookingDetails.date}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Booking Date: {bookingDetails.bookingDate}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Passengers: {bookingDetails.numberOfPassengers}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
            Total Amount: ${bookingDetails.totalAmount}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Booking;
