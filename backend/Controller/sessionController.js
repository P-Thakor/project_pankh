const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');

exports.getSessionData = catchAsync(async (req, res, next) => {
  if (req.session) {
    return res.status(200).json({
      status: 'success',
      data: req.session,
    });
  }
  return next(new AppError('No session data found', 404));
});
