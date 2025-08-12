// pages/flights/FlightList.jsx
import { useFlight } from '../context/FlightContext';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import FlightTable from '../components/flight/FlightTable';
const FlightList = () => {
  const { flights, viewAllFlight,deleteFlightHandler} = useFlight();
  
  const navigate = useNavigate();

  useEffect(() => {    
    viewAllFlight();
  }, []);

  const handleUpdate = (id) => {
    // navigate(`/flights/edit/${id}`);
    navigate(`/updateFlight/${id}`); 
  };

 const handleDelete = (id) => {
   
    deleteFlightHandler(id);
    alert('Flight deleted!');
  };
   const handleAdd = (id) => {
    // navigate(`/flights/edit/${id}`);
    
    navigate(`/addFlight`); 
  };
  
  return (
    <div style={{ padding: '2rem' }}>

      <h2> Flights Info</h2><br></br>
      <FlightTable flights={flights} onUpdate={handleUpdate} onDelete={handleDelete} onAdd={handleAdd}/>
    </div>
  );
};

export default FlightList;
