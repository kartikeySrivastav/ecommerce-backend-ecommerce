const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createUser, loginUserCtrl } = require("../controller/authCtrl");

router.post("/signup", createUser);
router.post("/login", loginUserCtrl);
router.post("/profile", authMiddleware, isAdmin, (req, res) => {
  res.status(200).json({ user: "profile" });
});
module.exports = router;
