 
const bcrypt = require('bcrypt');
const User = require('../users/user.model');
const users = require('./usersData');

const seedUsers = async () => {
  try {
    // Optional: Clear existing users
    await User.deleteMany();
    console.log('Existing users removed');

    // Hash passwords
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    // Insert users
    await User.insertMany(hashedUsers);
    console.log('Users seeded successfully');
  } catch (err) {
    console.error('Error seeding users:', err);
    throw err;
  }
};

module.exports = seedUsers;
	 	  	    	   	 	      	 	
