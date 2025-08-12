

const bcrypt = require('bcrypt');
const repository = require('../users/user.repository');
const AppError = require('../utils/AppError');
const { UNAUTHORIZED } = require('../constants/statusCodes');
const ERRORCODES = require('../constants/errorCodes');

exports.verifyUser = async ({ email, password }) => {
  const user = await repository.findByEmail(email);
  console.log("userrrrrrrrrrrrrrrrrr", user)
  if (!user) {
    throw new AppError('Invalid email or password', UNAUTHORIZED, ERRORCODES.AUTH_FAILED);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {	 	  	    	   	 	      	 	
    throw new AppError('Invalid email or password', UNAUTHORIZED, ERRORCODES.AUTH_FAILED);
  }

  return user; // Return full user for token creation

};

