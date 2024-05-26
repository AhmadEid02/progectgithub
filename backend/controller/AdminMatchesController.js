const { default: mongoose } = require('mongoose');
const Match = require("../modal/matches");

const addMatch = async (req, res) => {
    try {
        const { team1, team2, team1Logo, team2Logo, date, time, sport, link } = req.body;

        // Create a new match
        const match = new Match({
            team1,
            team2,
            team1Logo,
            team2Logo,
            date,
            time,
            sport,
            link
        });

        // Save the match to the database
        await match.save();

        // Send the response back to the client
        res.status(201).json({
            message: "Match added successfully",
            match
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding match",
            error: error.message
        });
    }
};

const updateMatch = async (req, res) => {
    try {
        const { id } = req.params;
        const { team1, team2, team1Logo, team2Logo, date, time, sport, link } = req.body;

        // Find the match by ID and update it
        const match = await Match.findByIdAndUpdate(
            id,
            { team1, team2, team1Logo, team2Logo, date, time, sport, link },
            { new: true, runValidators: true }
        );

        if (!match) {
            return res.status(404).json({
                message: "Match not found"
            });
        }

        // Send the response back to the client
        res.status(200).json({
            message: "Match updated successfully",
            match
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating match",
            error: error.message
        });
    }
};

const getoneMatch = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the match by ID
        const match = await Match.findById(id);

        if (!match) {
            return res.status(404).json({
                message: "Match not found"
            });
        }

        // Send the response back to the client
        res.status(200).json({
            message: "Match retrieved successfully",
            match
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving match",
            error: error.message
        });
    }
};
const deleteOneMatch = async (req, res) => {
    const { id } = req.params; // Extract the match ID from the request parameters

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid match ID" });
    }

    try {
        const deletedMatch = await Match.findByIdAndDelete(id);

        if (!deletedMatch) {
            return res.status(404).json({ error: "Match not found" });
        }

        res.status(200).json({ message: "Match deleted successfully" });
    } catch (error) {
        console.error("Error deleting match:", error);
        res.status(500).json({ error: "An error occurred while deleting the match" });
    }
};



module.exports = {
    addMatch,
    updateMatch,
    getoneMatch,
    deleteOneMatch,
};
