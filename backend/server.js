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



app.get("/test-route", (req, res) => {
    res.send("Backend is updated");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const scoreRoutes = require("./routes/scoreRoutes");
app.use("/api", scoreRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
