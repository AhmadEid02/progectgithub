const { default: mongoose } = require('mongoose')
const News = require("../modal/news")

const getAllNews = async (req, res) => {
    try {
        // Retrieve all news entries from the database
        const newsList = await News.find();

        // Send the response back to the client
        res.status(200).json({
            message: "All news retrieved successfully",
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

        // Retrieve news entries by news type
        const newsList = await News.find({ newsType });

        if (!newsList.length) {
            return res.status(404).json({
                message: "No news found for this type"
            });
        }

        // Send the response back to the client
        res.status(200).json({
            message: "News by type retrieved successfully",
            news: newsList
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving news by type",
            error: error.message
        });
    }
}


module.exports = {
    getAllNews,
    getByNewsType
}