const mongoose = require("mongoose");
const Joi = require("joi");

const chatSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  },
  channel: {
    type: String,
    require: true
  }
});

const Chat = mongoose.model("Chat", chatSchema);

const validate = chat => {
  const schema = {
    name: Joi.string().required(),
    message: Joi.string().required()
  };

  return Joi.validate(chat, schema);
};

module.exports = {
  Chat,
  validate
};
