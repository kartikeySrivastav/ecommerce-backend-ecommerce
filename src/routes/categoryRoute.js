const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {createCategory} =  require('../controller/categoryCtrl');


 router.post('/', authMiddleware, isAdmin, createCategory );

 module.exports = router;
