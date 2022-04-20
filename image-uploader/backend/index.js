const path = require('path');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const multer = require('multer');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

// *********** Constants
const app = express();
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests. Try again later.',
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 5, // allow 5 requests per 15 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
  // request # 101 is delayed by  500ms
  // request # 102 is delayed by 1000ms
  // request # 103 is delayed by 1500ms
  // etc.
});

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/images/',
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
  }),
  limits: {
    fileSize: 4 * 2 ** 20, // 4MB
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (allowedMimeTypes.indexOf(file.mimetype) === -1) {
      cb(new Error('File type not allowed'));
    }

    cb(null, true);
  },
});

// ****************** Middleware application
app.use(helmet());

app.use(express.static('build/'));

app.use(express.static('uploads/'));

// ******************** Routes
app.post(
  '/images',
  speedLimiter,
  limiter,
  upload.single('image'),
  (req, res) => {
    // Trim the uploads/ part of the file path
    const imagePath = `http://${req.hostname}:${PORT}/${
      req.file.path.split('uploads/')[1]
    }`;
    res.json({ path: imagePath });
  }
);

app.set('trust proxy', 1);
app.get('/ip', limiter, (request, response) => response.send(request.ip));

// **************** Error handler
app.use(errorHandler);

// **************** Server running
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}!`));
