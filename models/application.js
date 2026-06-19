const mongoose = require("mongoose");
const app = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    startup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "STARTUP"
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
})
module.exports = mongoose.model("APPLI", app);