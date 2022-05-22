const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({});

// Add a username, hash and salt fields.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
