const mongoose = require('mongoose');
const User = require('../Models/userModel.js'); // Adjust the path to your User model

const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB);

const createUsers = async () => {
  try {
    const users = [];
    // for (let i = 132; i <= 133; i++) {
    const id = `d23dce174`;
    const email = `d23dce174@charusat.edu.in`;
    const password = id;
    const institute = 'DEPSTAR';
    const isVerifiedEmail = true;
    const department = 'CE';
    const collegeId = id;

    const user = new User({
      username: id,
      email: email,
      password,
      institute,
      isVerifiedEmail,
      department,
      collegeId,
    });
    console.log(user);

    await User.register(user, password);
    users.push(user);
    // }
    console.log(`${users.length} users created successfully!`);
    mongoose.connection.close();
  } catch (err) {
    console.error('Error creating users:', err);
    mongoose.connection.close();
  }
};

createUsers();
