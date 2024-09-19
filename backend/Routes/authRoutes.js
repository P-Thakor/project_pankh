const express = require('express');
const authController = require('../Controller/authController');
const router = express.Router();

// Sign-up Route
router.route('/signup').post(authController.signup);

// Login Route
router.route('/login').post(authController.login);

// Logout Route
router.route('/logout').get(authController.logout);

module.exports = router;
