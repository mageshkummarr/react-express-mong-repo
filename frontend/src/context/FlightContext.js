import { createContext, useContext, useState } from 'react';
import { viewFlights,getFlightById,deleteFlightByFlightNumber,updateFlightByFlightNumber,addFlight } from '../services/flightService';
const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);
    const [flight, setFlight] = useState([]);

  const [selectedFlight, setSelectedFlight] = useState(null);

  const selectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const clearSelectedFlight = () => {
    setSelectedFlight(null);
  };

  const viewAllFlight = async () => {
  try {
        const data = await viewFlights(); // 👈 calling service method
// console.log("data",data)
        setFlights(data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      
    };
  };

const addFlightHandler = async (newFlightData) => {
  try {
    const data = await addFlight(newFlightData); // 👈 service call
    console.log('Flight added:', data);
    // Optionally refresh list or update UI
    viewAllFlight();
  } catch (error) {
    console.error('Error adding flight:', error);
  }
};

const updateFlightHandler = async (flightNumber, updatedData) => {
  try {
    console.log("update ",flightNumber)
    console.log("update ",updatedData)

    const data = await updateFlightByFlightNumber(flightNumber, updatedData); // 👈 service call
    console.log('Flight updated:', data);
    // Optionally refresh list or update UI
    viewAllFlight();
  } catch (error) {
    console.error('Error updating flight:', error);
  }
};

const deleteFlightHandler = async (flightNumber) => {
  try {
    await deleteFlightByFlightNumber(flightNumber); // 👈 service call
    console.log('Flight deleted:', flightNumber);
    // Optionally refresh list or update UI
    viewAllFlight();
  } catch (error) {
    console.error('Error deleting flight:', error);
  }
};

  const getFlightByIds = async (id) => {
  try {
        const data = await getFlightById(id); // 👈 calling service method
       console.log("getby id ",data)
        return data;
      } catch (error) {
        console.error('Error fetching flights:', error);
      
    };
  };




  return (
    <FlightContext.Provider value={{ flights,updateFlightHandler,deleteFlightHandler, addFlightHandler,setFlights,viewAllFlight,getFlightByIds, selectedFlight, selectFlight, clearSelectedFlight }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlight must be used within a FlightProvider');
  }
  return context;
};	 	  	      	 		 	   	       	 	
