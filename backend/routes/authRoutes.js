const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

console.log("Auth routes loaded");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        console.log("Register route hit");
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ msg: "All fields required" });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ msg: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashed
        });

        await newUser.save();

        res.json({ msg: "Registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: "Invalid credentials" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok)
            return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id },
            "playarena_secret",
            { expiresIn: "1h" }
        );

        res.json({ msg: "Login successful", token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
