const express = require("express");
const router = express.Router();
const Application = require("../models/application.js");
const Startup = require("../models/startup.js");
const protect = require("../middleware/authMiddleware.js");

router.post("/", protect, async(req, res) => {
    try {
        const applicant = req.user2.userId;
        const { startupid } = req.body;
        const cus = await Application.create({
            applicant: applicant,
            startup: startupid
        })
        res.status(200).json({ message: "wait until founder approves" });

    } catch (err) {
        res.status(500).json({ message: "server error", err });
    }
});


module.exports = router;