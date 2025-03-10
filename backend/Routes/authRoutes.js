const express = require('express');

const router = express.Router();
const authController = require('../Controller/authController');
const { isVerifiedEmail, checkUserActive } = require('../Utils/middleware');

// Sign-up Route
router.route('/signup').post(authController.signup);

// Login Route
router
  .route('/login')
  .post(isVerifiedEmail, checkUserActive, authController.login);

// Logout Route
router.route('/logout').get(authController.logout);

// Forgot Password Route
router.route('/forgotPassword').post(authController.forgotPassword);

// Reset Password Route
router.route('/resetPassword/:Otp').get(authController.verifyOtp);

// Change Password Route
router.route('/changePassword').patch(authController.changePassword);

// Verify Email Route
router
  .route('/send-verification-email')
  .post(authController.sendVerificationEmail);

router.route('/verify-email').get(authController.verifyEmail);

module.exports = router;
