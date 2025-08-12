const Flight = require('../flights/flight.model');

exports.findAll = () => Flight.find();

exports.create = (data) => Flight.create(data);

// exports.update = (id, data) =>
//   Flight.findByIdAndUpdate(id, data, { new: true });

// exports.delete = (id) =>
//   Flight.findByIdAndDelete(id);
exports.update = (flightNumber, data) =>
  Flight.findOneAndUpdate({ flightNumber }, data, { new: true });

exports.delete = (flightNumber) =>
  Flight.findOneAndDelete({ flightNumber });


exports.findFlightByFlightNumber = async (flightNumber) => {
  console.log(flightNumber)
  return Flight.findOne({ flightNumber});
};
exports.findFlights = (from, to) => {
  return Flight.find({
    departureCity: from,
    arrivalCity: to
  });
};

exports.findFlightById = async (id) => {
  return await Flight.findById(id);
};



	 	  	    	   	 	      	 	
