const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const eventRouter = require('./Routes/eventRouter');
const clubRouter = require('./Routes/clubRoutes');
<<<<<<< HEAD
=======
const userRouter = require('./Routes/userRoutes');

>>>>>>> 5a1ef9b6bc97c62b38a71c1f7f01c116becb8b01
const app = express();

app.use(
  express.json({
    limit: '10kb',
  }),
);

//Set Security HTTP Headers
// app.use(helmet());

// Data Sanitization against noSQL querry injection
app.use(mongoSanitize());

// Data Sanitization against XSS (cross-site scripting)
// app.use(xss());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

<<<<<<< HEAD
app.use('/api/v1', eventRouter);
app.use('/api/v1', clubRouter);
=======
app.use('/api/v1/event', eventRouter);
app.use('/api/v1/club', clubRouter);
app.use('/api/v1/user', userRouter);
>>>>>>> 5a1ef9b6bc97c62b38a71c1f7f01c116becb8b01

module.exports = app;
