const Event = require('../Models/eventModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find();
  res.status(200).json({
    status: 'success',
    results: events.length,
    data: events,
  });
});

exports.getOneEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new AppError(404, 'Event not found'));
  }
  res.status(200).json({
    status: 'success',
    data: event,
  });
});

exports.createEvent = catchAsync(async (req, res, next) => {
  const newEvent = await Event.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newEvent,
  });
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) {
    return next(new AppError(404, 'Event not found'));
  }
  res.status(200).json({
    status: 'success',
    data: event,
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  await Event.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
  });
});
