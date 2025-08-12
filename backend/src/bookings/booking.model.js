const mongoose = require('mongoose');
 
const bookingSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  // flightId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Flight'
  // },
  flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      required: true
    },
  bookedFor: {
    type: Date,
    required: true
  },
  bookedOn: {
    type: Date,
    default: Date.now
  }
});
 
module.exports = mongoose.model('Booking', bookingSchema);	 	  	      	  	  			  	 	
