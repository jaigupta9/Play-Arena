require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));



// REGISTER
app.post("/api/register", async (req, res) => {
    try {
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
app.post("/api/login", async (req, res) => {
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
