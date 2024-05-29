const express = require('express');
const router = express.Router()
const {AddOneFields,getAllFields,getOneField,updateFields,updateFieldsImagesArray, getAllBookingsForField}=require("../controller/fieldController")



router.get("/", getAllFields)
router.get("/:id", getOneField)
router.get("/booked/:fieldId", getAllBookingsForField)
router.post("/",AddOneFields)
router.put("/",updateFields)
router.put("/udateImageArray",updateFieldsImagesArray)

module.exports = router;