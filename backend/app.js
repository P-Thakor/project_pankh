const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const eventRouter = require('./Routes/eventRouter');
const clubRouter = require('./Routes/clubRoutes');
const app = express();

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

app.use('/api/v1', eventRouter);
app.use('/api/v1', clubRouter);

module.exports = app;
