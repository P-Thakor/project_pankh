const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const MasterEvent = require('../Models/masterEventModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const User = require('../Models/userModel');
const sendEmail = require('../Utils/email');

exports.getMasterEvent = catchAsync(async (req, res, next) => {
  const masterEvent = await MasterEvent.find();
  console.log('get master event: ', masterEvent);
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
      creator: req.user?.id,
      // contactEmail: req.user.Email,
      contactNumber: req.user?.contactNumber || '',
    });
    console.log('MasterEvent created:', newMasterEvent);
    res.status(201).json({
      status: 'success',
      data: newMasterEvent,
    });
  } catch (error) {
    console.log('error in create masterEvent', error);
    if (error.code == 11000) {
      return next(new AppError('MasterEvent Name already exists', 400));
    }
    next(error);
  }
});

exports.updateMasterEvent = catchAsync(async (req, res, next) => {
  try {
    const masterEvent = await MasterEvent.findByIdAndUpdate(
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
  const master = await MasterEvent.findByIdAndDelete(req.params.id);
  console.log('deleted master : ', master);
  res.status(204).json({
    status: 'success',
  });
});
