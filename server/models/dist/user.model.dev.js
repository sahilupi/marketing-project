"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var devenv = require('../devenv');

var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: 'Full name can\'t be empty'
  },
  email: {
    type: String,
    required: 'Email can\'t be empty',
    unique: true
  },
  password: {
    type: String,
    required: 'Password can\'t be empty',
    minlength: [4, 'Password must be atleast 4 character long']
  },
  role: {
    type: String,
    required: true,
    "default": "user",
    "enum": ["user", "admin"]
  },
  saltSecret: String
}, {
  timestamps: true
}); // Custom validation for email

userSchema.path('email').validate(function (val) {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.'); // Methods

userSchema.statics.hashPassword = function hashPassword(password) {
  var _this = this;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(_this.password, salt, function (err, hash) {
      _this.password = hash;
      _this.saltSecret = salt;
    });
  });
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function (remeberMe) {
  return jwt.sign({
    _id: this._id,
    role: this.role
  }, process.env.JWT_SECRET || devenv.LOCAL_JWT_SECRET, {
    expiresIn: remeberMe ? '365d' : process.env.JWT_EXP || devenv.LOCAL_JWT_EXP
  });
};

mongoose.model('User', userSchema);