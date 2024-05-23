const express = require('express');
const router = express.Router()
const {AddOneFields,getAllFields,getOneField,updateFields,updateFieldsImagesArray}=require("../controller/fieldController")



router.get("/", getAllFields)
router.get("/:id", getOneField)
router.post("/",AddOneFields)
router.put("/",updateFields)
router.put("/udateImageArray",updateFieldsImagesArray)
module.exports = router;