const mongoose = require('mongoose');

const Schema = {
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phno: {
        type: String,
        unique: true,
        required: true
    },
    avatar: String,
    password: {
        type: String,
        required: true
    }
}

module.exports = mongoose.model('User', Schema);