const { body, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const ERROR_CODES = require('../constants/errorCodes');

const validateBooking = [
  body('flight')
    .notEmpty().withMessage('Flight ID is required')
    .isMongoId().withMessage('Flight ID must be a valid Mongo ID'),

  body('bookedFor')
    .notEmpty().withMessage('Booking date is required')
    .isISO8601().withMessage('Booking date must be a valid date (YYYY-MM-DD)')
    .custom((value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // start of today
      const bookedFor = new Date(value);

      if (bookedFor <= today) {
        throw new Error('Booking date must be in the future');
      }

      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Validation failed', 422, ERROR_CODES.VALIDATION_ERROR, errors.array()));
    }
    next();
  }
];

module.exports = { validateBooking };
	 	  	      	  	  			  	 	
