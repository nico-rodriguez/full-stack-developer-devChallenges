const session = require('express-session');

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
  const MemoryStore = require('memorystore')(session);
  // MemoryStore configuration
  sessionStore = new MemoryStore({
    checkPeriod: 1000 * 60 * 60 * 24, // prune expired entries every 24h
  });
} else {
  console.error(
    `Unhandled environment variable $NODE_ENV=${process.env.NODE_ENV}`
  );
}

module.exports = session({
  name: 'sessionId',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // Expires after 24h.
  // connect-redis prunes its entries by default according to this number.
  // See `ttl` option of the `RedisStore`: https://www.npmjs.com/package/connect-redis.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  },
  store: sessionStore,
});
