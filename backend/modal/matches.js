const mongoose = require('mongoose')

const matchesSchema = new mongoose.Schema({
    team1: {
        type: String,
        required: true
    },
    team2: {
        type: String,
        required: true
    },
    team1Logo: {
        type: String,
        required: true
    },
    team2Logo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    sport: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }

}, { timestamps: true })

const matchesSAC = mongoose.model('matchesSAC', matchesSchema);

module.exports = matchesSAC;