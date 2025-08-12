// src/pages/flights/AddFlight.jsx
import {
  Container, Paper, Grid, Typography, TextField,
  InputAdornment, Button
} from '@mui/material';
import {
  Flight, AccessTime, AttachMoney, FlightTakeoff, FlightLand
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';


import { useFlight } from '../context/FlightContext';
import {  useState } from 'react';

const AddFlight = () => {
  const { addFlightHandler} = useFlight();
  const [form, setForm] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // e.preventDefault();
    console.log("form",form)
    addFlightHandler(form);
    alert('Flight added successfully!');
    // navigate('/flights');
  
  };

  const handleFormChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

 return (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Flight
      </Typography>
<br></br>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Row 1: Flight No + Airline */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Flight Number"
              onChange={handleFormChange('flightNumber')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Flight />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Airline"
              onChange={handleFormChange('airline')}
            />
          </Grid>

          {/* Row 2: From + To */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Departure City"
              onChange={handleFormChange('departureCity')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FlightTakeoff />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Arrival City"
              onChange={handleFormChange('arrivalCity')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FlightLand />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Row 3: Departure & Arrival Time */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Departure Time"
              onChange={handleFormChange('departureTime')}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTime />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Arrival Time"
              onChange={handleFormChange('arrivalTime')}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTime />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Row 4: Duration + Price */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Duration (e.g. 7h 30m)"
              onChange={handleFormChange('duration')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Price"
              onChange={handleFormChange('price')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} textAlign="center">
            <Button variant="contained" type="submit" size="large">
              Add Flight
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
);

};

export default AddFlight;
