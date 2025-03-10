const User = require('../Models/userModel');
const AppError = require('./appError');

exports.isAuthenticated = (req, _, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return next(
    new AppError('You are not logged in. Please log in to get access.', 401),
  );
};

exports.userRole = (req, _, next) => {
  if (req.user && (req.user.role === 'user' || req.user.role === 'other')) {
    return next(
      new AppError('You are not allowed to access this resource', 403),
    );
  }
  return next();
};

exports.isVerifiedEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password',
    });
  }

  if (user.isVerifiedEmail) {
    return next();
  }
  return next(
    new AppError(
      'Your email is not verified. Please verify your email to access this resource.',
      401,
    ),
  );
};

exports.checkUserActive = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select('+active');
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  console.log('Missed Event Counter:', user.missedEventCounter);

  if (!user.active) {
    return res.status(403).json({
      message:
        'Your account has been deactivated due to repeated absences. Please contact your faculty for reactivation.',
    });
  }

  next();
};
