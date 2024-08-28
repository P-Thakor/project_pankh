const Club = require('../Models/clubModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create a new club
exports.createClub = catchAsync(async (req, res, next) => {
  const newClub = await Club.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      club: newClub,
    },
  });
});

exports.getAllClubs = catchAsync(async (req, res, next) => {
  const clubs = await Club.find();
  res.status(200).json({
    status: 'success',
    results: clubs.length,
    data: {
      clubs,
    },
  });
});

exports.getClubById = catchAsync(async (req, res, next) => {
  const club = await Club.findById(req.params.id);
  if (!club) {
    return next(new AppError('Club not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      club,
    },
  });
});

exports.updateClub = catchAsync(async (req, res, next) => {
  const updatedClub = await Club.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedClub) {
    return next(new AppError('Club not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      club: updatedClub,
    },
  });
});

exports.deleteClub = catchAsync(async (req, res, next) => {
  const club = await Club.findByIdAndDelete(req.params.id);
  if (!club) {
    return next(new AppError('Club not found', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
