 
// const jwt = require('jsonwebtoken');

// exports.generateToken = (user) => {
//   const payload = {
//     id: user._id,
//     email: user.email,
//     role: user.role
//   };

//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
// };
const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '20m' }); // 15 mins
};

exports.generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

exports.verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
	 	  	    	   	 	      	 	
