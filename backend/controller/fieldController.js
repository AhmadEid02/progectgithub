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
const getOneField= async (req,res)=>{
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json("no such field")
        }
        const field = await Field.findById(id)
        if (!field) {
            return res.status(404).json("no such field")
        }
        res.status(200).json(field)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateFields = async () => {
    try {
      // Update all documents to include the pricePerHour attribute
      await Field.updateMany({}, { $set: { pricePerHour: 20 } }); // Set default value as needed
      console.log('All documents updated successfully.');
    } catch (error) {
      console.error('Error updating documents:', error);
    } 
  };

module.exports = {
    getAllFields,
    AddOneFields,
    getOneField,
    updateFields
}