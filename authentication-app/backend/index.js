const express = require('express');
require('express-async-errors');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
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

// Configuration of the store for the session of express-session
let sessionStore;
if (process.env.NODE_ENV === 'development') {
  // Redis configuration and connection (only in development)
  const RedisStore = require('connect-redis')(session);
  const { createClient } = require('redis');
  const redisClient = createClient({ legacyMode: true });
  redisClient
    .connect()
    .then(() => {
      console.log('Connected to session database!');
    })
    .catch((err) => {
      console.error('Could not connect to session database.');
      console.error(err);
      process.exit(1);
    });
  sessionStore = new RedisStore({
    client: redisClient,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });
} else if (process.env.NODE_ENV === 'production') {
  // MemoryStore configuration
  sessionStore = new MemoryStore({
    checkPeriod: 1000 * 60 * 60 * 24, // prune expired entries every 24h
  });
} else {
  console.error(
    `Unhandled environment variable $NODE_ENV=${process.env.NODE_ENV}`
  );
}

// Configure passport
// Use mongoose local strategy
passport.use(User.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Apply middleware
app.use(helmet());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // Expires after 24h.
    // connect-redis prunes its entries by default according to this number.
    // See `ttl` option of the `RedisStore`: https://www.npmjs.com/package/connect-redis.
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: sessionStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
