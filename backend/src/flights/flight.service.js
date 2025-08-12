 
const repository = require('../flights/flight.repository');
const AppError = require('../utils/AppError');
const { NOT_FOUND } = require('../constants/statusCodes');
const ERROR_CODES = require('../constants/errorCodes');


exports.getAll = () => repository.findAll();

exports.create = (data) => repository.create(data);

exports.update = async (id, data) => {
  console.log("before update")
  const updated = await repository.update(id, data);
  if (!updated) throw new AppError('Flight not found', NOT_FOUND, ERROR_CODES.FLIGHT_NOT_FOUND);
  console.log("hhh",updated);
  return updated;
};

exports.remove = async (id) => {
  const deleted = await repository.delete(id);
  if (!deleted) throw new AppError('Flight not found', NOT_FOUND, ERROR_CODES.FLIGHT_NOT_FOUND);
};


exports.searchFlights = async (from, to) => {
  const flights = await repository.findFlights(from, to);
  if (!flights || flights.length === 0) {
    throw new AppError('No flights found for the given criteria', NOT_FOUND, ERROR_CODES.FLIGHT_NOT_FOUND);
  }
  return flights;
}; 	

exports.findFlightById = async (id) => {
  console.log("vvv",id)
  const flight = await repository.findFlightByFlightNumber(id)
  console.log(flight)
  if (!flight) {
    throw new AppError('Flight not found', 404, ERROR_CODES.FLIGHTS_NOT_FOUND);
  }
  return flight;
};


	 	  	      	  	  			  	 	
