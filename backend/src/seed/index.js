const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const seedFlights = require('./seedFlights');
const seedUsers = require('./seedUsers');

const connectDB = require('../config/db');

const runSeed = async () => {
  try {
    await connectDB();
    console.log('MongoDB Connected');

    await seedUsers();    // Seed users first (e.g. admin login)
    await seedFlights();  // Then seed flights

    console.log('✅ All data seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

runSeed();
	 	  	    	   	 	      	 	
