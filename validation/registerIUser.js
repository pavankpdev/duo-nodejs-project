const joi = require('joi');

module.exports = joi.object({
    fullname: joi.string().required().min(3),
    email: joi.string().email().required(),
    phno: joi.string().required(),
    avatar: joi.string(),
    password: joi.string().required()
})