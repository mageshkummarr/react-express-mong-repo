import { useState, useContext, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import { Flight, Search, People, DateRange } from '@mui/icons-material';
import FlightCard from '../components/flight/FlightCard';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { searchFlights, validateSearchFilters } from '../services/flightService';
import { isAuthenticated } from '../services/authService';

const FlightSearch = () => {
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      setError('You must be logged in to search flights. Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [auth, navigate]);

  const handleSearch = async () => {
    try {
      // Validate search filters
      validateSearchFilters(filters);

      // Check authentication before making API call
      if (!isAuthenticated()) {
        setError('You must be logged in to search flights. Please login first.');
        return;
      }

      setLoading(true);
      setError('');

      const data = await searchFlights(filters);
      setResults(data);

    } catch (err) {
      console.error('Search error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (flight) => {
    // Check if the user is authenticated
    if (!auth) {
      navigate('/login', {
        state: { 
          from: '/flight-search',
          message: 'Please login to book flights'
        }
      });
      return;
    }

    // Validate flight data
    if (!flight || !flight._id) {
      setError('Invalid flight selection');
      return;
    }

    // Navigate to booking page with flight and search details
    try {
      navigate('/booking', {
        state: {
          flightDetails: {
            flightId: flight._id,
            fare: flight.price || flight.fare,
            flightNumber: flight.flightNumber,
            departureTime: flight.departureTime,
            duration: flight.duration
          },
          searchParams: {
            departureCity: filters.from || flight.departureCity,
            arrivalCity: filters.to || flight.arrivalCity,
            departureDate: filters.date || new Date(flight.departureTime).toISOString().split('T')[0],
            numberOfPassengers: filters.passengers || 1
          }
        }
      });
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Failed to proceed to booking. Please try again.');
    }
  };

  const handleChange = (field) => (event) => {
    setFilters({ ...filters, [field]: event.target.value });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Flight color="primary" sx={{ mr: 1 }} />
          Search Flights
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="From"
              value={filters.from}
              onChange={handleChange('from')}
              placeholder="Departure city (e.g., New York)"
              InputProps={{
                startAdornment: <InputAdornment position="start"><Flight /></InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="To"
              value={filters.to}
              onChange={handleChange('to')}
              placeholder="Arrival city (e.g., London)"
              InputProps={{
                startAdornment: <InputAdornment position="start"><Flight /></InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={filters.date}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><DateRange /></InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Passengers"
              type="number"
              value={filters.passengers}
              onChange={handleChange('passengers')}
              InputProps={{
                startAdornment: <InputAdornment position="start"><People /></InputAdornment>
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        {results.length > 0
          ? `Available Flights from ${filters.from} to ${filters.to}`
          : 'No flights to show. Please search for flights.'}
      </Typography>

      {results.map((flight) => (
        <FlightCard key={flight._id || flight.id} flight={flight} onBook={handleBook} />
      ))}

      {results.length > 0 && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Chip label={`Showing ${results.length} flight${results.length > 1 ? 's' : ''}`} />
        </Box>
      )}
    </Container>
  );
};

export default FlightSearch;