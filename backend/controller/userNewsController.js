const { default: mongoose } = require('mongoose')
const News = require("../modal/news")
const getAllNews = async (req, res) => {
    try {
        // Retrieve all non-disabled news entries from the database
        const newsList = await News.find({ disable: false });

        // Send the response back to the client
        res.status(200).json({
            message: "All non-disabled news retrieved successfully",
            news: newsList
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving news",
            error: error.message
        });
    }
}

const getByNewsType = async (req, res) => {
    try {
        const { newsType } = req.params;

        // Retrieve non-disabled news entries by news type
        const newsList = await News.find({ newsType, disable: false });

        if (!newsList.length) {
            return res.status(404).json({
                message: "No non-disabled news found for this type"
            });
        }

        // Send the response back to the client
        res.status(200).json({
            message: "Non-disabled news by type retrieved successfully",
            news: newsList
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving non-disabled news by type",
            error: error.message
        });
    }
}

module.exports = {
    getAllNews,
    getByNewsType
}