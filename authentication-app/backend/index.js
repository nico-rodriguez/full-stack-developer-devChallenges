const express = require('express');
require('express-async-errors');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

const signupRouter = require('./api/v1/signup.js');
const loginRouter = require('./api/v1/login.js');
const logoutRouter = require('./api/v1/logout.js');
const User = require('./models/User.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure passport
// Use mongoose local strategy
passport.use(User.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Apply middleware
if (process.env.NODE_ENV === 'production') {
  const pino = require('pino-http')();
  app.use(pino);
}
app.use(helmet());
app.use(express.json());
app.use(require('./auth/session.js'));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());

// Use routes
app.use('/api/v1/signup', signupRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/logout', logoutRouter);

// Connect to database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to users database!');
  })
  .catch((err) => {
    console.error('Could not connect to users database.');
    console.error(err);
    process.exit(1);
  });

// Start server
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}!`));
