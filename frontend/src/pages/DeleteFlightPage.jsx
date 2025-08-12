// src/pages/flights/AddFlight.jsx
import {
  Container, Paper, Grid, Typography, TextField,
  InputAdornment, Button
} from '@mui/material';
import {
  Flight
} from '@mui/icons-material';
import { useFlight } from '../context/FlightContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DeleteFlight = () => {
  const {  deleteFlightHandler} = useFlight();
  const [form, setForm] = useState();
  const navigate = useNavigate();
 

  const handleFormChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   // e.preventDefault();
    console.log("form",form)
    deleteFlightHandler(form.flightNumber, form);
    alert('Flight deleted!');
    navigate('/flights');
  };
 
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Add New Flight</Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth label="Flight Number" 
                onChange={handleFormChange('flightNumber')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Flight /></InputAdornment>
                }}
              />
            </Grid>
          
            <Grid item xs={12}>
              <Button variant="contained" type="submit">Delete Flight</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default DeleteFlight;
