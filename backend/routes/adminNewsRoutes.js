const express = require('express');
const { addNews, updateNews, getoneNews, deleteOneNews } = require('../controller/adminNewsController');
const router = express.Router()

router.post("/add",addNews)
router.put("/update/:id",updateNews)
router.get("/:id",getoneNews)
router.delete("/:id",deleteOneNews)


module.exports = router;