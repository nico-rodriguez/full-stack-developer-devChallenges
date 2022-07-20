const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  githubId: {
    type: String,
    required: false,
    default: '',
  },
  photo: {
    type: String,
    required: false,
    default: '',
  },
  name: {
    type: String,
    required: false,
    default: '',
  },
  bio: {
    type: String,
    required: false,
    default: '',
  },
  phone: {
    type: String,
    required: false,
    default: '',
  },
  // email: {
  //   type: String,
  //   required: false,
  //   default: '',
  // },
});

// Add a username, hash and salt fields.
UserSchema.plugin(passportLocalMongoose, {
  // For the complete list of options see https://github.com/saintedlama/passport-local-mongoose#main-options
  // specifies the interval in milliseconds between login attempts, which increases exponentially based on the number of failed attempts
  interval: 100,
  // specifies the maximum amount of time an account can be locked
  maxInterval: 1000 * 60 * 5,
  usernameField: 'email',
  usernameUnique: true,
  // specifies whether login attempts should be limited and login failures should be penalized
  limitAttempts: true,
  // specifies the maximum number of failed attempts allowed before preventing login
  maxAttempts: 5,
  // specifies the interval in milliseconds, which is for unlock user automatically after the interval is reached
  unlockInterval: 1000 * 60 * 5,
});

module.exports = mongoose.model('User', UserSchema);
