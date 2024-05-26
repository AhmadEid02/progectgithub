const { default: mongoose } = require('mongoose')
const Field = require("../modal/fields")
const User = require('../modal/userModal')

const updateField = async (req,res)=>{
    try {
        const fieldId = req.params.id;
        const updateData = req.body;

        // Find the field by ID and update it with the new data
        const updatedField = await Field.findByIdAndUpdate(fieldId, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });

        if (!updatedField) {
            return res.status(404).json({ message: 'Field not found' });
        }

        res.status(200).json(updatedField);
    } catch (error) {
        console.error('Error updating field:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { updateField };