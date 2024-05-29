const express = require('express');
const { addNews, updateNews, getoneNews, deleteOneNews, getByNewsType, getAllNews } = require('../controller/adminNewsController');

const router = express.Router()

router.post("/add",addNews)
router.put("/update/:id",updateNews)
router.get("/:id",getoneNews)
router.delete("/:id",deleteOneNews)
router.get("/:sport",getByNewsType)
router.get("/",getAllNews)

module.exports = router;