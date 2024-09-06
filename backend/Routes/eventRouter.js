const express = require('express');
const eventController = require('../Controller/eventContoller');

const router = express.Router();

router.route('/getAllEvents').get(eventController.getAllEvents);

router.route('/createEvent').post(eventController.createEvent);

router.route('/getEvent/:id').get(eventController.getOneEvent);

router.route('/updateEvent/:id').patch(eventController.updateEvent);

router.route('/deleteEvent/:id').delete(eventController.deleteEvent);

module.exports = router;
