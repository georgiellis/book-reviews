const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    maxlength: 90
  },
  lastname: {
    type: String,
    maxlength: 90
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(SALT, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, function(err, hash) {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};
userSchema.methods.generateToken = function(callback) {
  var token = jwt.sign(this._id.toHexString(), config.SECRET);
  this.token.token;
  this.save(function(err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};
const User = mongoose.model('User', userSchema);
module.exports = { User };