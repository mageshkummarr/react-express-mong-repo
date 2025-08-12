const AppError = require('../utils/AppError');
const ERROR_CODES = require('../constants/errorCodes');
const { param, validationResult, body } = require('express-validator');


const validateSearchQuery = (req, res, next) => {
  const { from, to } = req.body;
  const AppError = require('../utils/AppError');

  if (!from || !to ) {
    throw new AppError('from, to, and date are required', 400, ERROR_CODES.MISSING_FIELDS);
  }

  // const searchDate = new Date(date); // caution: ensure input is YYYY-MM-DD

  // if (isNaN(searchDate)) {
  //   throw new AppError('Invalid date format. Use YYYY-MM-DD', 400, ERROR_CODES.INVALID_DATE);
  // }

  // const today = new Date();
  // today.setHours(0, 0, 0, 0); // midnight today

  // const maxDate = new Date(today);
  // maxDate.setDate(today.getDate() + 45);

  // if (searchDate < today) {
  //   throw new AppError('Date cannot be in the past', 400, ERROR_CODES.INVALID_DATE);
  // }
  // if (searchDate > maxDate) {
  //   throw new AppError('Date cannot be more than 45 days ahead', 400, ERROR_CODES.INVALID_DATE);
  // }

  next(); 
};

const validateFlightIdParam = [
  param('id').isMongoId().withMessage('Invalid flight ID'),

  // Final handler to catch validation errors
  (req, res, next) => {	 	  	      	  	  			  	 	
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Validation failed', 422, ERROR_CODES.VALIDATION_ERROR, errors.array()));
    }
    next();
  },
];

const validateAddFlight = [
  body('flightNumber').notEmpty().withMessage('Flight number is required'),
  body('departureCity').notEmpty().withMessage('Departure city is required'),
  body('arrivalCity').notEmpty().withMessage('Arrival city is required'),
  body('departureTime').notEmpty().withMessage('Departure time is required'),
  body('arrivalTime').notEmpty().withMessage('Arrival time is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('duration').notEmpty().withMessage('Duration is required'),
  body('airline').notEmpty().withMessage('Airline is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Validation failed', 422, ERROR_CODES.VALIDATION_ERROR, errors.array()));
    }
    next();
  }
];


module.exports = { validateSearchQuery, validateFlightIdParam, validateAddFlight};
	 	  	      	  	  			  	 	
