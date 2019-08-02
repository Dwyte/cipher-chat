/*jshint esversion: 8 */

const mongoose = require("mongoose");
const Joi = require("joi");

const chatSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 500
  },
  channel: {
    type: String,
    require: true
  },
  timestamp: {
    type: String,
    require: true
  },
  senderPbkHash: {
    type: String
  },
  recieverPbkHash: {
    type: String
  },
  seen: {
    type: Boolean
  }
});

const Chat = mongoose.model("Chat", chatSchema);

const validate = chat => {
  const schema = {
    name: Joi.string().required(),
    message: Joi.string()
      .required()
      .min(1)
      .max(500)
      .regex(/^(?!\s*$).+/),
    channel: Joi.string().required(),
    timestamp: Joi.string().required(),
    recieverPbkHash: Joi.string(),
    senderPbkHash: Joi.string(),
    seen: Joi.boolean()
  };

  return Joi.validate(chat, schema);
};

module.exports = {
  Chat,
  validate
};
