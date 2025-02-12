const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const SendEmail = require('../Utils/email');

// Sign-up
exports.signup = catchAsync(async (req, res, next) => {
  const {
    username,
    email,
    password,
    collegeId,
    role,
    contactNumber,
    institute,
  } = req.body;
  // console.log(collegeId);

  const newUser = new User({
    username,
    email,
    collegeId,
    role,
    contactNumber,
    institute,
  });

  await User.register(newUser, password);

  console.log(newUser);
  // await new SendEmail(newUser, '').sendWelcome();

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return next(new AppError('Email not found', 404));
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  const verificationUrl = `http://localhost:8001/api/v1/auth/verify-email?token=${token}`;

  try {
    await new SendEmail(newUser, verificationUrl).sendVerificationEmail();
    console.log('Sent Email');
  } catch (err) {
    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500,
    );
  }
  // Optionally: Log the user in after signup
  req.login(newUser, (err) => {
    if (err) return next(err);

    req.session.user = {
      id: newUser._id,
      username: newUser.username,
    };

    // res.cookie('userId', newUser._id.toString(), {
    //   httpOnly: true,
    //   maxAge: 3600000, // 1 hour
    //   // secure: process.env.NODE_ENV === 'production',
    //   secure: false,
    //   sameSite: 'lax',
    // });

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

    req.login(user, (error) => {
      if (error) return next(error);

      req.session.user = {
        id: user._id,
        username: user.username,
      };

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
exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    // req.logout((err) => {
    //   if (err) {
    //     return next(err); // Passes any error to the global error handler
    //   }

    res.clearCookie('connect.sid', {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'none',
    });
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
  });
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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // store user email in cookie
  res.cookie('email', req.body.email, {
    httpOnly: true,
    maxAge: 3600000, // 1 hour
    secure: false,
  });
  console.log(req.cookie);
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  console.log('Generated OTP: ', resetToken);
  // 3) Send it to user's email
  try {
    await new SendEmail(user.email, resetToken).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500,
    );
  }
});

exports.verifyOtp = catchAsync(async (req, res, next) => {
  // 1) Get user based on the OTP
  const inputOtp = req.params.Otp;

  try {
    const user = await User.findOne({
      resetPasswordToken: inputOtp,
      resetPasswordExpire: { $gt: Date.now() },
    });
    // 2) If OTP has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    // await user.setPassword(req.body.password);
    // await user.save();
    res.status(200).json({
      status: true,
      message: 'Token verified successfully!',
    });
  } catch (err) {
    return next(new AppError('Error setting new password', 500));
  }
});

exports.changePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  console.log(req.cookies);
  const email = decodeURIComponent(req.cookies.email);
  console.log(email);
  const user = await User.findOne({
    email,
  });
  // 2) Check if user has password set
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  // // 3) Check if posted current password is correct
  // if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
  //   return next(new AppError('Your current password is wrong.', 401));
  // }
  // 3) If so, update password
  await user.setPassword(req.body.password);
  // disable validation
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully!',
  });
});

exports.sendVerificationEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) {
    return next(new AppError('Email not found', 404));
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  const verificationUrl = `http://localhost:8001/api/v1/auth/verify-email?token=${token}`;

  try {
    await new SendEmail(user.email, verificationUrl).sendVerificationEmail();

    res.status(200).json({
      status: 'success',
      message: 'Verification email sent!',
    });
  } catch (err) {
    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500,
    );
  }
});

// Endpoint to verify the email
exports.verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    user.isVerifiedEmail = true;
    await user.save();

    res.send(`Email verified successfully for ${decoded.email}!`);
  } catch (error) {
    console.error('Verification failed:', error);
    res.status(400).send('Invalid or expired verification link.');
  }
});
