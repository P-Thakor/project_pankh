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
