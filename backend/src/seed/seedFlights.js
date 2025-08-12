 
const Flight = require('../flights/flight.model');
const flightData = require('./flightData');

const seedFlights = async () => {
  await Flight.deleteMany(); 
  await Flight.insertMany(flightData);
  console.log('Flights seeded successfully');
};

module.exports = seedFlights;
