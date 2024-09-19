const User = require('../Models/userModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const passport = require('passport');

// Sign-up
exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email });
  await User.register(newUser, password);

  // Optionally: Log the user in after signup
  req.login(newUser, (err) => {
    if (err) return next(err);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  });
});

// Login
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return next(new AppError('Incorrect email or password', 401));

    req.login(user, (err) => {
      if (err) return next(err);
      res.status(200).json({
        status: 'success',
        message: 'Logged in successfully',
        data: {
          user,
        },
      });
    });
  })(req, res, next);
};

// Logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
  });
};
