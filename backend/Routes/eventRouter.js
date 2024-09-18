const express = require('express');
const eventController = require('../Controller/eventContoller');
const { isAuthenticated } = require('../middleware');
const router = express.Router();

router.route('/getAllEvents').get(eventController.getAllEvents);

router.route('/createEvent').post(isAuthenticated, eventController.createEvent);

router.route('/getEvent/:id').get(eventController.getOneEvent);

router
  .route('/updateEvent/:id')
  .patch(isAuthenticated, eventController.updateEvent);

router
  .route('/deleteEvent/:id')
  .delete(isAuthenticated, eventController.deleteEvent);

module.exports = router;
