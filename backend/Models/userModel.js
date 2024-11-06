const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const crypto = require('crypto');

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
  // passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
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
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' }); // Use email for authentication instead of username;

// // 2) Generate Password Reset Token
// userSchema.methods.createPasswordResetToken = function () {
//   // Generate OTP
//   const resetToken = crypto.randomBytes(32).toString('hex');

//   // Hash the token and save it to user document
//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   // 10min expiration time
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

//   // Return plain token to be sent to user via email
//   return resetToken;
// };

// // 3) Check if the reset token is valid
// userSchema.methods.verifyPasswordResetToken = function (token) {
//   const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
//   return (
//     hashedToken === this.passwordResetToken &&
//     this.passwordResetExpires > Date.now()
//   );
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
