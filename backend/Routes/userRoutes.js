const express = require('express');

const { isAuthenticated, userRole } = require('../Utils/middleware');

const userController = require('../Controller/userController');
const eventController = require('../Controller/eventContoller');

const router = express.Router();

router.route('/getAllUsers').get(isAuthenticated, userController.getAllUsers);

router.route('/createUser').post(userController.createUser);

router.route('/getUser/:id').get(userController.getOneUser);

router
  .route('/updateUser/:id')
  .patch(
    isAuthenticated,
    eventController.uploadEventImages,
    eventController.uploadImage,
    userController.updateUser,
  );

// router.route('/updateUser/:id').patch(userController.updateUser);

router
  .route('/deleteUser/:id')
  .delete(isAuthenticated, userController.deleteUser);

router.route('/registerEvent/:id').patch(eventController.registerEventForUser);

router.route('/me').get(isAuthenticated, userController.getMe);

router
  .route('/getUserByStudentId/:collegeId')
  .get(userController.getOneUserByStudentId);

router.route('/activateUser').post(userRole, userController.activateUser);
module.exports = router;
