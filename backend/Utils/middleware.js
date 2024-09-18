const AppError = require('./utils/appError');

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return next(
    new AppError('You are not logged in. Please log in to get access.', 401),
  );
};
