const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    authToken: String
});

const userOject = {
    first_name: "string",
    last_name: "string",
    email: "string",
    password: "string"
};

module.exports = {
    userModel: mongoose.model('Users', userSchema),
    userObject: userOject
};