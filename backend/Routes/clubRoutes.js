const express = require('express');
const clubController = require('../Controller/clubController'); // Update the path as needed

const router = express.Router();

router.route('/clubs').get(clubController.getAllClubs);

router.route('/createClub').post(clubController.createClub);

router.route('/club/:id').get(clubController.getClubById);

router.route('/updateClub/:id').patch(clubController.updateClub);

router.route('/deleteClub/:id').delete(clubController.deleteClub);

router.route('/addMember/:id').patch(clubController.addMember);

router.route('/getAllMembers/:id').get(clubController.getMembersOfClub);

module.exports = router;
