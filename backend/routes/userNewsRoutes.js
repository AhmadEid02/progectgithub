const express = require('express');
const { getAllNews, getByNewsType } = require('../controller/userNewsController');

const router = express.Router()

router.get("/",getAllNews)
router.get("/:newsType",getByNewsType)

module.exports = router;