const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

// Index for performance: ascending by game, descending by score
scoreSchema.index({ game: 1, score: -1 });
// Unique index to ensure only one score per user per game
scoreSchema.index({ userId: 1, game: 1 }, { unique: true });

module.exports = mongoose.model("Score", scoreSchema);
