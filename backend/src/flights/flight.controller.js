 
const service = require('../flights/flight.service');
const { OK, CREATED, NO_CONTENT } = require('../constants/statusCodes');

exports.getAllFlights = async (req, res, next) => {
  try {
    const flights = await service.getAll();
    res.status(OK).json(flights);
  } catch (err) {
    next(err);
  }
};

exports.createFlight = async (req, res, next) => {
  try {
    const flight = await service.create(req.body);
    res.status(CREATED).json(flight);
  } catch (err) {
    next(err);
  }
};

exports.updateFlight = async (req, res, next) => {
  try {
    console.log("inside controller",req.params.id)
    const flight = await service.update(req.params.id, req.body);
    res.status(OK).json(flight);
  } catch (err) {
    next(err);
  }
};

exports.deleteFlight = async (req, res, next) => {
  try {
    await service.remove(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }	 	  	    	   	 	      	 	
};

exports.searchFlights = async (req, res, next) => {
  try {
    const { from, to} = req.body;
    const flights = await service.searchFlights(from, to);
    res.status(OK).json(flights);
  } catch (err) {
    next(err);
  }
};


exports.getFlightById = async (req, res, next) => {
  try{
    console.log("in controller",req.params.id)
    const flight = await service.findFlightById(req.params.id);
    res.status(OK).json({ status: 'success', data: flight });
  } catch (err) {
    next(err);
  }
};
