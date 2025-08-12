 
// const jwt = require('jsonwebtoken');
// const AppError = require('../utils/AppError');
// const { UNAUTHORIZED } = require('../constants/statusCodes');
// const { TOKEN_INVALID } = require('../constants/errorCodes');

// module.exports = (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       throw new AppError('Token missing', UNAUTHORIZED, TOKEN_INVALID);
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     next(new AppError('Invalid or expired token', UNAUTHORIZED, TOKEN_INVALID));
//   }
// };

const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { UNAUTHORIZED } = require('../constants/statusCodes');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(new AppError('No access token provided', UNAUTHORIZED));

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token', UNAUTHORIZED));
  }
};

	 	  	    	   	 	      	 	
