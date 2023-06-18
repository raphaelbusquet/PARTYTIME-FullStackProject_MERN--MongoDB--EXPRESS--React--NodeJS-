const mongoose = require("mongoose"); // Importing mongoose

const UserSchema = new mongoose.Schema({  // Creating a Schema
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

const User = mongoose.model('User', UserSchema) // Creating a model

module.exports = User;