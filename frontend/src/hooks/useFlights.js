import { useContext } from 'react';
import { FlightContext } from '../context/FlightContext';

// Custom hook to access flight data and selection from context
export default function useFlights() {
  const context = useContext(FlightContext);
  if (!context) throw new Error('useFlights must be used within a FlightProvider');
  return context;
}
