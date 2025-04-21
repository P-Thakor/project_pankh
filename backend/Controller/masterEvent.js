const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const MasterEvent = require('../Models/masterEventModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const User = require('../Models/userModel');
const sendEmail = require('../Utils/email');

exports.getMasterEvent = catchAsync(async (req, res, next) => {
  const masterEvent = MasterEvent.findByID();
  if (!masterEvent) {
    return new AppError('Master Event not Found', 404);
  }
  res.status(200).json({
    status: 'success',
    data: masterEvent,
  });
});

exports.createMasterEvent = catchAsync(async (req, res, next) => {
  try {
    const newMasterEvent = await MasterEvent.create({
      ...req.body,
      creator: req.user.id,
      contactEmail: req.user.Email,
      contactNumber: req.user.contactNumber || '',
    });
    res.status(201).json({
      status: 'success',
      data: newMasterEvent,
    });
  } catch (error) {
    if (error == 11000) {
      console.log('error in create masterEvent', error);
      return next(new AppError('MasterEvent Name already exists', 400));
    }
  }
});

exports.updateMasterEvent = catchAsync(async (req, res, next) => {
  try {
    const masterEvent = await MasterEvent.findbyIdandUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!masterEvent) {
      return new AppError(404, 'Master event Not Found');
    }
    res.status(200).json({
      status: 'Success',
      data: masterEvent,
    });
  } catch (error) {
    console.log('Error in update Master Event', error);
  }
});

exports.deleteMasterEvent = catchAsync(async (req, res, _) => {
  await MasterEvent.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
  });
});
