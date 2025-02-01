const express = require('express');

const router = express.Router();
const { isAuthenticated, userRole } = require('../Utils/middleware');
const eventController = require('../Controller/eventContoller');
// const authController = require('../Controller/authController');

router.get(
  '/getAllEvents',
  // authController.restrictTo('admin'),
  eventController.getAllEvents,
);

router
  .route('/createEvent')
  .post(
    isAuthenticated,
    eventController.uploadEventImages,
    eventController.uploadImage,
    userRole,
    eventController.createEvent,
  );

router
  .route('/createEventByClub/:id')
  .post(isAuthenticated, eventController.createEventByClub);
// router.post(
//   '/createEvent',
//   // eventController.uploadEventImages,
//   // eventController.uploadImage,
//   eventController.createEvent,
// );

router.get('/getEvent/:id', eventController.getOneEvent);

router.patch(
  '/updateEvent/:id',
  eventController.uploadEventImages,
  eventController.uploadImage,
  //eventController.resizeEventImage,
  eventController.updateEvent,
);
router
  .route('/updateEvent/:id')
  .patch(isAuthenticated, eventController.updateEvent);

router.delete('/deleteEvent/:id', eventController.deleteEvent);
router
  .route('/deleteEvent/:id')
  .delete(isAuthenticated, eventController.deleteEvent);

module.exports = router;
