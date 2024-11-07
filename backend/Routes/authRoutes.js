const express = require('express');

const router = express.Router();
const authController = require('../Controller/authController');

// Sign-up Route
router.route('/signup').post(authController.signup);

// Login Route
router.route('/login').post(authController.login);

// Logout Route
router.route('/logout').get(authController.logout);

// Forgot Password Route
router.route('/forgotPassword').post(authController.forgotPassword);

// Reset Password Route
router.route('/resetPassword/:Otp').patch(authController.resetPassword);

// Verify Email Route
router
  .route('/send-verification-email')
  .post(authController.sendVerificationEmail);

router.route('/verify-email').get(authController.verifyEmail);

module.exports = router;
