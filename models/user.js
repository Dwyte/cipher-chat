const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  bio: {
    type: String,
    require: true,
    maxLength: 50,
    default: "Write something, bio/motto/desc, anything!"
  },
  auth: {
    type: String,
    require: true
  }
});

const User = mongoose.model("User", userSchema);

const generateToken = auth => {
  return jwt.sign({ auth }, config.get("jwtKey"));
};

const validate = user => {
  const schema = {
    username: Joi.string().required(),
    bio: Joi.string().default("Write something, bio/motto/desc, anything!").max(50).required(),
    auth: Joi.string().required()
  };

  return Joi.validate(user, schema);
};

module.exports = {
  User,
  validate,
  generateToken
};
