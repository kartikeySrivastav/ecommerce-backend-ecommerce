const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  adminMiddleware,
  userMiddleware,
} = require("../middlewares/authMiddleware");
const { addItemToCart } = require("../controller/cartCtrl");

router.post("/add", authMiddleware, userMiddleware, addItemToCart);

module.exports = router;
