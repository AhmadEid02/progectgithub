const express = require('express');
const router = express.Router()
const {createBooking, getBooked, modifyBooking}=require("../controller/bookingController")
const middleware = require('./middleware');


router.use(middleware);

router.post("/",createBooking)
router.get("/booked",getBooked)
router.put("/modify",modifyBooking)
module.exports = router;