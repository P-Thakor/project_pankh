const express = require('express');
const sessionController = require('../Controller/sessionController');
const { isAuthenticated } = require('../Utils/middleware');

const router = express.Router();

router.route('/').get(isAuthenticated, sessionController.getSessionData);

module.exports = router;
