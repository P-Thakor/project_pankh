const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
// const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User should have a Name'],
    trim: true,
    // unique: true,
  },
  email: {
    type: String,
    required: [true, 'User should have an Email'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email'],
  },
  collegeId: {
    type: String,
    unique: true,
    trim: true,
  },
  isVerifiedEmail: {
    type: Boolean,
    default: false,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'faculty-member', 'club-leader', 'admin', 'other'],
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
  contactNumber: {
    type: String,
    trim: true,
    required: true
  },
  institute: {
    type: String,
    enum: ['DEPSTAR', 'CSPIT', 'IIIM', 'CMPICA', 'RPCP', 'PDPIAS', 'MTIN', 'ARIP', 'BDIPS'],
  },
  department: {
    type: String,
    enum: ['CSE', 'IT', 'CE', 'EC', 'EE', 'MECH', 'CVL', 'AIML']
  },
  passwordChangedAt: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' }); // Use email for authentication instead of username;

userSchema.methods.createPasswordResetToken = function () {
  const OTP = Math.floor(100000 + Math.random() * 900000);
  this.resetPasswordToken = OTP;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return OTP;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
