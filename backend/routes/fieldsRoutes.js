const express = require('express');
const router = express.Router()
const {AddOneFields,getAllFields}=require("../controller/fieldController")



router.get("/", getAllFields)
router.post("/",AddOneFields)

module.exports = router;