 
const User = require('../users/user.model');

exports.findByEmail = (email) => {
  return User.findOne({ email });
};

exports.findById = (id) => {
  return User.findById(id); // ✅ Add this
};