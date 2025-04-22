const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cron = require('node-cron');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const masterEventRouter = require('./Routes/masterEventRoutes')
const reviewRouter = require('./Routes/reviewRouter');
const eventRouter = require('./Routes/eventRouter');
const userRouter = require('./Routes/userRoutes');
const clubRouter = require('./Routes/clubRoutes');
const authRouter = require('./Routes/authRoutes');
const sessionRoutes = require('./Routes/sessionRoutes');
// const { isAuthenticated } = require('./Utils/middleware');
const User = require('./Models/userModel');
const globalErrorHandler = require('./Controller/errorController');
const sendReminderEmails = require('./Controller/remainderController');
dotenv.config({ path: './config.env' });

const app = express();
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === 'production',
      // secure: false,
      samesite: 'none',
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser((user, done) => {
  done(null, user.id); // Store only the user ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Fetch full user object when needed
  } catch (err) {
    done(err);
  }
});

// Schedule task to run every day at 8 AM
cron.schedule('0 8 * * *', () => {
  console.log('Running daily reminder email job...');
  sendReminderEmails();
});

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

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: ['http://172.16.11.55:3005', 'http://localhost:3005'], // Specify your frontend domain here
    credentials: true,
  }),
);

app.use((req, res, next) => {
  // console.log('Session:', req.session);
  next();
});

app.use('/api/v1/event', eventRouter);
app.use('/api/v1/club', clubRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/session', sessionRoutes);
app.use('/api/v1/masterEvent',masterEventRouter)
app.use(globalErrorHandler);

module.exports = app;
