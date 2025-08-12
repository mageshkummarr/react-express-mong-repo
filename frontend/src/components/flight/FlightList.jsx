import PropTypes from 'prop-types';
import FlightCard from './FlightCard';

function FlightList({ flights }) {
  return (
    <div>
      {flights.length === 0 ? (
        <p className="text-gray-500">No flights found matching your criteria.</p>
      ) : (
        flights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
          />
        ))
      )}
    </div>
  );
}

FlightList.propTypes = {
  flights: PropTypes.array.isRequired,
};

export default FlightList;