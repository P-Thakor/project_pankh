const Event = require('../Models/eventModel'); // Assuming you have an event model
const Review = require('../Models/reviewModel'); // Assuming you have a review model
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create a review for a specific event
exports.createReview = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  // Create a new review
  const review = new Review({
    text: req.body.text,
    rating: req.body.rating,
    author: req.user._id,
  });

  event.reviews.push(review);
  await review.save();
  await event.save();

  res.status(201).json({
    status: 'success',
    data: {
      review,
    },
  });
});

// Delete a specific review within an event
exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  // Optionally: Ensure that only the review's author or an admin can delete the review
  //   if (review.author.toString() !== req.user._id.toString()) {
  //     return next(
  //       new AppError('You do not have permission to delete this review', 403),
  //     );
  //   }

  await Review.findByIdAndDelete(req.params.reviewId);

  // Remove the review from the event's reviews array
  const event = await Event.findById(req.params.eventId);
  if (event) {
    event.reviews.pull(req.params.reviewId);
    await event.save();
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
