const auth = require("../models/model.js");
const express = require("express");
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const dol = express.Router();

dol.post("/", async(req, res) => {
    try {
        const { usernamefor, password, dob, email } = req.body;
        const haspasword = await bycrypt.hash(password, 10);
        const register = await auth.create({
            usernamefor: usernamefor,
            password: haspasword,
            dob: dob,
            email: email

        })
        register.password = undefined;
        res.status(201).json({ message: "your registration is complete. you can now login to get token", register })
    } catch (err) {
        res.status(500).json({ message: "failed", error: err })
    }
})

module.exports = dol;