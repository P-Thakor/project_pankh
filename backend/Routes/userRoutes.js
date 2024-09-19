const express = require('express');
const userController = require('../Controller/userController');

const router = express.Router();

router.route('/getAllUsers').get(userController.getAllUsers);

router.route('/createUser').post(userController.createUser);

router.route('/getUser/:id').get(userController.getOneUser);

// router.route('/updateUser/:id').patch(userController.updateUser);

router.route('/deleteUser/:id').delete(userController.deleteUser);

module.exports = router;
