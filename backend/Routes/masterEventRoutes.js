const express = require('express');
const router = express.Router();
const { isAuthenticated, userRole } = require('../Utils/middleware');
const MasterEventController = require('../Controller/masterEvent');

router.get('/getMasterEvent', MasterEventController.getMasterEvent);

router.post(
  '/createMasterEvent',
  isAuthenticated,
  MasterEventController.createMasterEvent,
);

router.delete(
  '/deleteMasterEvent/:id',
  MasterEventController.deleteMasterEvent,
);

router.patch('/updatemasterEvent/:id', MasterEventController.updateMasterEvent);

module.exports = router;
