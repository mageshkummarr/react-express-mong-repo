import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import { format } from 'date-fns';

function FlightCard({ flight, onBook }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6">
              {flight.departureCity} → {flight.arrivalCity}
            </Typography>
            <Typography color="text.secondary">
              {format(new Date(flight.departureTime), 'MMM d, yyyy - h:mm a')}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'right' }}>
            <Typography variant="h5">₹{flight.price}</Typography>
            <Typography variant="caption">One way</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Typography variant="body2">
              Flight No: {flight.flightNumber}
            </Typography>
            <Typography variant="body2">
              Duration: {flight.duration}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              onClick={() => onBook(flight)}
            >
              Book Now
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

FlightCard.propTypes = {
  flight: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    flightNumber: PropTypes.string,
    departureCity: PropTypes.string,
    arrivalCity: PropTypes.string,
    departureTime: PropTypes.string,
    duration: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onBook: PropTypes.func.isRequired,
};

export default FlightCard;