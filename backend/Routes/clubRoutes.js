const express = require('express');
const clubController = require('../Controller/clubController'); // Update the path as needed

const router = express.Router();

router
  .route('/')
  .post(clubController.createClub)
  .get(clubController.getAllClubs);

router
  .route('/:id')
  .get(clubController.getClubById)
  .patch(clubController.updateClub)
  .delete(clubController.deleteClub);

module.exports = router;
