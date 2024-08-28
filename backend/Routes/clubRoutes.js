const express = require('express');
const clubController = require('../Controller/clubController'); // Update the path as needed
const router = express.Router();

router.post('/clubs', clubController.createClub);
router.get('/clubs', clubController.getAllClubs);
router.get('/clubs/:id', clubController.getClubById);
router.patch('/clubs/:id', clubController.updateClub);
router.delete('/clubs/:id', clubController.deleteClub);

module.exports = router;
