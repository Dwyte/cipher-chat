const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 12
  },
  bio: {
    type: String,
    maxLength: 25,
    default: "A new CipherChat user..."
  },
  auth: {
    type: String,
    require: true
  },
  salt: {
    type: String
  },
  privateKeyCipher: {
    type: String
  },
  publicKey: {
    type: String
  },
  pbkHash: {
    type: String
  },
  status: {
    type: String,
    default: ""
  }
});

const User = mongoose.model("User", userSchema);

const generateToken = auth => {
  return jwt.sign({ auth }, config.get("jwtKey"));
};

const validate = user => {
  const schema = {
    username: Joi.string()
      .required()
      .min(2)
      .max(12),
    bio: Joi.string()
      .default("A new CipherChat user...")
      .max(25),
    auth: Joi.string().required(),
    salt: Joi.string(),
    privateKeyCipher: Joi.string(),
    publicKey: Joi.string(),
    pbkHash: Joi.string(),
    status: Joi.string().default("")
  };

  return Joi.validate(user, schema);
};

module.exports = {
  User,
  validate,
  generateToken
};
