const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const reviewRouter = require('./Routes/reviewRouter');
const eventRouter = require('./Routes/eventRouter');
const userRouter = require('./Routes/userRoutes');
const clubRouter = require('./Routes/clubRoutes');
const authRouter = require('./Routes/authRoutes');
// const { isAuthenticated } = require('./Utils/middleware');
const User = require('./Models/userModel');

const app = express();
app.use(bodyParser.json());

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(
  express.json({
    limit: '10kb',
  }),
);

//Set Security HTTP Headers
app.use(helmet());

// Data Sanitization against noSQL querry injection
app.use(mongoSanitize());

// Data Sanitization against XSS (cross-site scripting)
app.use(xss());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/event', eventRouter);
app.use('/api/v1/club', clubRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/event/:eventId/reviews', reviewRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;
