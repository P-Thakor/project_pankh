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
  profilePhoto: {
    type: String,
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
    sparse: true,
    trim: true,
    set: (value) => (value === '' ? null : value),
  },
  isVerifiedEmail: {
    type: Boolean,
    default: false,
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
  eventsAttended: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
    },
  ],
  eventsMissed: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
    },
  ],
  contactNumber: {
    type: String,
    trim: true,
    required: true,
  },
  institute: {
    type: String,
    enum: [
      'DEPSTAR',
      'CSPIT',
      'IIIM',
      'CMPICA',
      'RPCP',
      'PDPIAS',
      'MTIN',
      'ARIP',
      'BDIPS',
    ],
  },
  department: {
    type: String,
    enum: ['CSE', 'IT', 'CE', 'EC', 'EE', 'MECH', 'CVL', 'AIML'],
  },
  designation: {
    type: String,
  },
  passwordChangedAt: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre('validate', function (next) {
  if (this.role === 'user' && !this.collegeId) {
    return next(new Error('College ID is Required'));
  }
  next();
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' }); // Use email for authentication instead of username;

userSchema.methods.createPasswordResetToken = function () {
  const OTP = Math.floor(100000 + Math.random() * 900000);
  this.resetPasswordToken = OTP;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return OTP;
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await this.authenticate(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
