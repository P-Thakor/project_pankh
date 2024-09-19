const express = require('express');

const { isAuthenticated } = require('../Utils/middleware');

const userController = require('../Controller/userController');

const router = express.Router();

router.route('/getAllUsers').get(isAuthenticated, userController.getAllUsers);

// router.route('/createUser').post(userController.createUser);

router.route('/getUser/:id').get(isAuthenticated, userController.getOneUser);

// router.route('/updateUser/:id').patch(userController.updateUser);

router
  .route('/deleteUser/:id')
  .delete(isAuthenticated, userController.deleteUser);

module.exports = router;
