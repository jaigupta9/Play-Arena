const express = require("express");
const router = express.Router();
const Score = require("../models/Score");
const User = require("../models/User");
const auth = require("../middleware/auth");

// POST /api/score
router.post("/score", auth, async (req, res) => {
    try {
        console.log("--- POST /api/score ---");
        console.log("Payload:", req.body);
        console.log("User from Auth:", req.user);
        
        const { game, score } = req.body;

        if (!game || score === undefined) {
            console.log("Validation failed: Game and score are required");
            return res.status(400).json({ msg: "Game and score are required" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            console.log("User not found in DB for ID:", req.user.id);
            return res.status(404).json({ msg: "User not found" });
        }

        const existingScore = await Score.findOne({ userId: req.user.id, game });

        if (existingScore) {
            if (game === "snake") {
                // Update only if new score is higher
                if (score > existingScore.score) {
                    console.log(`Updating snake score from ${existingScore.score} to ${score}`);
                    existingScore.score = score;
                    await existingScore.save();
                    console.log("Saved updated score:", existingScore);
                } else {
                    console.log(`New snake score (${score}) is not higher than existing (${existingScore.score})`);
                }
            } else if (game === "tic-tac-toe" || game === "rps") {
                // Cumulative wins
                console.log(`Updating ${game} cumulative score by ${score}`);
                existingScore.score += score;
                await existingScore.save();
                console.log("Saved updated score:", existingScore);
            }
            return res.json(existingScore);
        } else {
            // Create new score entry
            console.log(`Creating new score entry for game ${game} with score ${score}`);
            const newScore = new Score({
                userId: req.user.id,
                username: user.username,
                game,
                score
            });
            await newScore.save();
            console.log("Saved new score:", newScore);
            return res.json(newScore);
        }

    } catch (err) {
        console.error("Score POST error:", err);
        res.status(500).json({ error: "Server Error" });
    }
});

// GET /api/leaderboard/:game (PUBLIC route)
router.get("/leaderboard/:game", async (req, res) => {
    try {
        const { game } = req.params;
        
        // Fetch top 10 scores
        const leaderboard = await Score.find({ game })
            .sort({ score: -1 })
            .limit(10);

        res.json(leaderboard);
    } catch (err) {
        console.error("Leaderboard GET error:", err);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
