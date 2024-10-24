const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const reviewRouter = require('./Routes/reviewRouter');
const eventRouter = require('./Routes/eventRouter');
const userRouter = require('./Routes/userRoutes');
const clubRouter = require('./Routes/clubRoutes');
const authRouter = require('./Routes/authRoutes');
// const { isAuthenticated } = require('./Utils/middleware');
const User = require('./Models/userModel');
const globalErrorHandler = require('./Controller/errorController');

dotenv.config({ path: './config.env' });

const app = express();
app.use(cookieParser('process.env.SESSION_SECRET'));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 3600000,
    },
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

// Set Security HTTP Headers
app.use(helmet());

// Data Sanitization against noSQL querry injection
app.use(mongoSanitize());

// Data Sanitization against XSS (cross-site scripting)
app.use(xss());
app.use(xss());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

app.use('/api/v1/event', eventRouter);
app.use('/api/v1/club', clubRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

app.use(globalErrorHandler);

module.exports = app;
