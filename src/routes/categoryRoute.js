const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createCategory, getCategory } = require("../controller/categoryCtrl");

router.post("/", authMiddleware, createCategory);
router.get("/:id", getCategory);

module.exports = router;
