const { default: mongoose } = require('mongoose');
const Match = require("../modal/matches");

const getAllMatches = async (req, res) => {
    try {
        // Retrieve all matches from the database
        const matches = await Match.find();

        // Send the response back to the client
        res.status(200).json({
            message: "All matches retrieved successfully",
            matches
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving matches",
            error: error.message
        });
    }
};

const getMatchesByType = async (req, res) => {
    try {
        const { sport } = req.params;

        // Retrieve matches by sport type
        const matches = await Match.find({ sport });

        // Send the response back to the client
        res.status(200).json({
            message: `Matches for ${sport} retrieved successfully`,
            matches
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving matches by type",
            error: error.message
        });
    }
};

module.exports = {
    getAllMatches,
    getMatchesByType,
};