/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 12,
  },
  bio: {
    type: String,
    maxLength: 25,
    default: 'A new CipherChat user...',
  },
  auth: {
    type: String,
    require: true,
  },
  publicKey: {
    type: String,
    require: true,
  },
});

const User = mongoose.model('User', userSchema);

const generateToken = auth => {
  return jwt.sign({ auth }, config.get('jwtKey'));
};

const validate = user => {
  const schema = {
    username: Joi.string().required().min(2).max(12),
    bio: Joi.string()
      .default('A new CipherChat user...')
      .max(25),
    auth: Joi.string().required(),
    publicKey: Joi.string().required(),
  };

  return Joi.validate(user, schema);
};

module.exports = {
  User,
  validate,
  generateToken,
};
