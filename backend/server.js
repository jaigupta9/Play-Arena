const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, "data", "users.json");

// REGISTER
app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        return res.status(400).json({ msg: "All fields required" });

    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    if (users.find(u => u.email === email))
        return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashed });

    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.json({ msg: "Registered successfully" });
});

// LOGIN
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    const user = users.find(u => u.email === email);

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ email }, "playarena_secret", { expiresIn: "1h" });
    res.json({ msg: "Login successful", token });
});

// use Render's port if available, else default to 5000
const PORT = process.env.PORT || 5000;

// starts server
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
