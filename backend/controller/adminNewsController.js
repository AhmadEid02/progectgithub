const { default: mongoose } = require('mongoose')
const News = require("../modal/news")

const addNews = async (req, res) => {
    try {
        const { title, newsDescription, imageUrl, newsType, topics, disable } = req.body;

        // Create a new news item
        const news = new News({
            title,
            newsDescription,
            imageUrl,
            newsType,
            topics,
            disable
        });

        // Save the news item to the database
        await news.save();

        // Send the response back to the client
        res.status(201).json({
            message: "News added successfully",
            news
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding news",
            error: error.message
        });
    }
}
const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, newsDescription, imageUrl, newsType, topics, disable } = req.body;

        // Find the news item by ID and update it
        const news = await News.findByIdAndUpdate(
            id,
            { title, newsDescription, imageUrl, newsType, topics, disable },
            { new: true, runValidators: true }
        );

        if (!news) {
            return res.status(404).json({
                message: "News not found"
            });
        }

        // Send the response back to the client
        res.status(200).json({
            message: "News updated successfully",
            news
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating news",
            error: error.message
        });
    }

}
const getoneNews = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the news item by ID
        const news = await News.findById(id);

        if (!news) {
            return res.status(404).json({
                message: "News not found"
            });
        }

        // Send the response back to the client
        res.status(200).json({
            message: "News retrieved successfully",
            news
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving news",
            error: error.message
        });
    }
}
const deleteOneNews = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid news ID" });
      }
  
      const news = await News.findByIdAndDelete(id);
  
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
  
      res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting news",
        error: error.message
      });
    }
  };
  
  module.exports = {
    addNews,
    updateNews,
    getoneNews,
    deleteOneNews
  };