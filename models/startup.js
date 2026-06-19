const mongoose = require("mongoose");

const ne = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    founder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isopen: {
        type: Boolean,
        default: true
    },
    members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"

        }

    ]

})
module.exports = mongoose.model("STARTUP", ne)