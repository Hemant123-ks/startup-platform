const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    usernamefor: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("AUTHUSER", UserSchema);