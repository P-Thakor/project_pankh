const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User should have a Name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'User should have an Email'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'faculty-member', 'club-leader', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'User should have a Password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Confirm your Password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  // passwordChangedAt: Date,
  // resetPasswordToken: String,
  // resetPasswordExpire: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  eventsParticipated: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
