const express = require("express");
const start = require("../models/startup.js")
const app = require("../models/application.js");
const protect = require("../middleware/authMiddleware.js")
const router = express.Router();
router.post("/", protect, async(req, res) => {
    try {
        const { name, description, } = req.body;
        const found = req.user2.userId;
        const done = await start.create({
            name: name,
            description: description,
            founder: found
        })

        res.status(200).json({ message: "your statup got created" })
    } catch (err) {
        res.status(500).json({ message: "not done", err })
    }

})
router.get("/", protect, async(req, res) => {
    try {
        const userid = req.user2.userId;
        const fetch1 = await start.findOne({
            founder: userid,
        })
        if (!fetch1) {
            return res.status(401).json({ message: "you are not the founder" })
        }
        const applis = await app.find({
            startup: fetch1._id,
            status: "pending"
        }).populate("applicant", "username email")

        res.status(200).json({
            applicants: applis
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "server error", err });
    }
});
router.patch("/:id", protect, async(req, res) => {
    try {
        const { status } = req.body;
        const application = await app.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        const startup = await start.findById(application.startup);
        if (startup.founder.toString() !== req.user2.userId.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        application.status = status;
        await application.save();
        res.status(200).json({ message: "Application updated" });
    } catch (err) {
        res.status(500).json({ message: "server error", err });
    }

})
module.exports = router;