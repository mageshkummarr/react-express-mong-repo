 
const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: String,
  departureCity: String,
  arrivalCity: String,
  departureTime: Date,
  arrivalTime: Date,
  price: Number,
  duration: String,
  airline: String
});

module.exports = mongoose.model('Flight', flightSchema);
