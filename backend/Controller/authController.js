const passport = require('passport');
const User = require('../Models/userModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const SendEmail = require('../Utils/email');

// Sign-up
exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email });
  await User.register(newUser, password);

  const url = `${req.protocol}://${req.get('host')}/me`;
  // console.log(newUser);
  await new SendEmail(newUser, url).sendWelcome();

  // Optionally: Log the user in after signup
  req.login(newUser, (err) => {
    if (err) return next(err);

    res.cookie('userId', newUser._id.toString(), {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
    });

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
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return next(new AppError('Incorrect username or password', 401));

    req.login(user, (err) => {
      if (err) return next(err);

      res.cookie('userId', user._id.toString(), {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        sameSite: 'lax',
      });

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
exports.logout = async (req, res, next) => {
  try {
    await req.logout();
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
  } catch (err) {
    return next(err);
  }
};

exports.restrictTo = function (...roles) {
  return function (req, res, next) {
    // console.log(roles);
    // roles ['admin', 'club-leader']. role='user'
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};
