// pages/flights/EditFlight.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useFlight } from '../context/FlightContext';
import { useEffect, useState } from 'react';
import { TextField, Button, Grid, Container, Paper } from '@mui/material';

const EditFlight = () => {
  const { id } = useParams();
  const { getFlightByIds,updateFlightHandler} = useFlight();
  const navigate = useNavigate();
  const [ flight, setFlight ] = useState();

  
  const [form, setForm] = useState(flight || {});

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getFlightByIds(id);
      console.log("Fetched flight data:", data);
       setFlight(data);
    } catch (error) {
      console.error("Error fetching flight:", error);
    }
  };

  fetchData();
}, [id]);

useEffect(() => {
  console.log("Updated flight:", flight);
}, [flight]);


  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleUpdate = (e) => {
    // e.preventDefault();
    console.log("form",form)
    updateFlightHandler(form.flightNumber, form);
    alert('Flight updated!');
    navigate('/flights');
  };
 
  if (!flight) return <p>Flight not found.</p>;

  return (
    // console.log("hhh", flights.flightNumber)
    <Container maxWidth="md" sx={{ py: 4 }}>
       {/* {flight.flightNumber} */}
      <Paper sx={{ p: 4 }}>
        <h2>Edit Flight</h2>
        <form >
          <Grid container spacing={2}>
            <Grid item xs={6}>
             
              <TextField fullWidth label="Flight Number" value={flight.flightNumber} onChange={handleChange('flightNumber')} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Airline" value={flight.airline} onChange={handleChange('airline')} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="From" value={flight.departureCity} onChange={handleChange('departureCity')} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="To" value={flight.arrivalCity} onChange={handleChange('arrivalCity')} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Departure Time" type="time" value={flight.departureTime} onChange={handleChange('departureTime')} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Duration" value={flight.duration} onChange={handleChange('duration')} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Price" type="number" value={flight.price} onChange={handleChange('price')} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleUpdate} type="submit">Update Flight</Button>
            </Grid>
           
          </Grid> 
        </form>
        
      </Paper>
    </Container>
  );
};

export default EditFlight;
