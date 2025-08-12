const AppError = require('../utils/AppError');
const { FORBIDDEN } = require('../constants/statusCodes');
const { UNAUTHORIZED_ROLE } = require('../constants/errorCodes');

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError('You do not have access to this resource', FORBIDDEN, UNAUTHORIZED_ROLE));
    }
    next();
  };
};
