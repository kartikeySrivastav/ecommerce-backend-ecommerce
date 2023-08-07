const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  createUser,
  loginUserCtrl,
} = require("../../controller/admin/adminCtrl");

router.post("/signup", createUser);
router.post("/login", loginUserCtrl);

module.exports = router;
