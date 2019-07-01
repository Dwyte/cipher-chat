const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const User = mongoose.model('User', userSchema);

const validate = (user) => {
    const schema = {
        username: Joi.string().required(),
        password: Joi.string().required()
    }

    return Joi.validate(user, schema);
}

module.exports = {
    User,
    validate
}