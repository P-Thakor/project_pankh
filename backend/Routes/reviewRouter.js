const express = require('express');
const reviewController = require('../Controller/reviewController');
const { isAuthenticated } = require('../Utils/middleware');

const router = express.Router({ mergeParams: true });

router.route('/').post(isAuthenticated, reviewController.createReview);

router.route('/:reviewId').delete(reviewController.deleteReview);

module.exports = router;
