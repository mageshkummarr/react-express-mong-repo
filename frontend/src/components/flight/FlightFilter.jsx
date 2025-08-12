import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import Button from '../common/Button';

function FlightFilter({ filters, onChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(localFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Filter Flights</h3>
      <form onSubmit={handleSubmit}>
        <Input
          label="From"
          name="from"
          value={localFilters.from}
          onChange={handleInputChange}
          placeholder="City or Airport"
          className="mb-4"
        />
        <Input
          label="To"
          name="to"
          value={localFilters.to}
          onChange={handleInputChange}
          placeholder="City or Airport"
          className="mb-4"
        />
        <Input
          label="Date"
          type="date"
          name="date"
          value={localFilters.date}	 	  	      	 		 	   	       	 	
          onChange={handleInputChange}
          className="mb-6"
        />
        <Button type="submit" variant="primary" fullWidth>
          Search Flights
        </Button>
      </form>
    </div>
  );
}

FlightFilter.propTypes = {
  filters: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FlightFilter;