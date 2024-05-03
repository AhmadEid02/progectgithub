const { default: mongoose } = require('mongoose')
const Field = require("../modal/fields")

const getAllFields = async (req, res) => {
    try {
        const fields = await Field.find().sort({ createdAt: -1 })
        res.status(200).json(fields)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const AddOneFields = async (req, res) => {
    try {
        const newField = await Field.create(req.body);
        res.status(201).json(newField);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllFields,
    AddOneFields
}