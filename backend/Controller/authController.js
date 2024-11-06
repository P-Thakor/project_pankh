const passport = require('passport');
const User = require('../Models/userModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const SendEmail = require('../Utils/email');

// Sign-up
exports.signup = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const newUser = new User({ email });
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

// forgotpassword
// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(new AppError('There is no user with that email address.', 404));
//   }

//   // Generate reset token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });

//   // Send OTP via email
//   const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;
//   await new SendEmail(user, resetURL).sendPasswordReset();

//   res.status(200).json({
//     status: 'success',
//     message: 'Token sent to email!',
//   });
// });

// exports.resetPassword = catchAsync(async (req, res, next) => {
//   // 1) Get user by reset token
//   const user = await User.findOne({ email: req.body.email });
//   if (!user || !user.verifyPasswordResetToken(req.body.token)) {
//     return next(new AppError('Token is invalid or has expired', 400));
//   }

//   // 2) Set the new password
//   user.setPassword(req.body.password, async (err) => {
//     if (err) return next(new AppError('Error setting new password', 500));

//     // 3) Clear the reset token and expiration fields
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save();

//     // 4) Log the user in after password reset
//     req.login(user, (err) => {
//       if (err) return next(err);
//       res.status(200).json({
//         status: 'success',
//         message: 'Password reset successfully',
//       });
//     });
//   });
// });
