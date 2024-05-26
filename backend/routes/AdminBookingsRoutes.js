const express = require('express');
const { getAllbooking } = require('../controller/AdminBooking');
const router = express.Router()

router.get("/books",getAllbooking)

module.exports = router;