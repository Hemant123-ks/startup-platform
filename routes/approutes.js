const express = require("express");
const router = express.Router();
const Application = require("../models/application.js");
const Startup = require("../models/startup.js");
const protect = require("../middleware/authMiddleware.js");
const { io } = require("../socket-instance.js");
const { getsockets } = require("../socket.js");

router.post("/", protect, async(req, res) => {
    try {
        const applicant = req.user2.userId;
        const { startupid } = req.body;
        const cus = await Application.create({
            applicant: applicant,
            startup: startupid
        })
        const startup = await Startup.findById(startupid);
        const founderId = startup.founder;
        const socketId = getsockets(founderId);
        io.to(socketId).emit("new-application", { message: "Someone applied to your startup!" });



        res.status(200).json({ message: "wait until founder approves" });

    } catch (err) {
        res.status(500).json({ message: "server error", err });
    }
});


module.exports = router;