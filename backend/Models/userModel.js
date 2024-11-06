const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: [true, 'User should have a Name'],
  //   trim: true,
  //   unique: true,
  // },
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
  passwordChangedAt: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.plugin(passportLocalMongoose); // Use email for authentication instead of username;

userSchema.methods.createPasswordResetToken = function () {
  const OTP = Math.floor(100000 + Math.random() * 900000);
  this.resetPasswordToken = OTP;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return OTP;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
