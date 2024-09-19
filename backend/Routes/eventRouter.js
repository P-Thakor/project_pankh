const express = require('express');
const eventController = require('../Controller/eventContoller');

const router = express.Router();

router.get('/getAllEvents', eventController.getAllEvents);

router.post(
  '/createEvent',
  // eventController.uploadEventImages,
  // eventController.uploadImage,
  eventController.createEvent,
);

router.get('/getEvent/:id', eventController.getOneEvent);

router.patch(
  '/updateEvent/:id',
  eventController.uploadEventImages,
  eventController.uploadImage,
  // eventController.resizeEventImage,
  eventController.updateEvent,
);

router.delete('/deleteEvent/:id', eventController.deleteEvent);

module.exports = router;
