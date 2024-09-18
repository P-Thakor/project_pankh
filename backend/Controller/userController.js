const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // console.log(req.headers);
  const Users = await User.find();
  res.status(200).json({
    status: 'success',
    results: Users.length,
    data: Users,
  });
});

exports.getOneUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError(404, 'User not found'));
  }
  res.status(200).json({
    status: 'success',
    data: User,
  });
});

// exports.createUser = catchAsync(async (req, res, next) => {
//   const newUser = await User.create(req.body);
//   res.status(201).json({
//     status: 'success',
//     data: newUser,
//   });
// });

// exports.updateUser = catchAsync(async (req, res, next) => {
//   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!user) {
//     return next(new AppError(404, 'User not found'));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: User,
//   });
// });

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });
  res.status(204).json({
    status: 'success',
  });
});
