const express = require('express');
const router = express.Router();
const MasterEventController = require('../Controller/masterEvent');

router.get('/getMasterEvent', MasterEventController.getMasterEvent);

router.post('/createMasterEvent', MasterEventController.createMasterEvent);

router.delete('/deleteMasterEvent', MasterEventController.deleteMasterEvent);

router.patch('/updatemasterEvent', MasterEventController.updateMasterEvent);

module.exports = router;
