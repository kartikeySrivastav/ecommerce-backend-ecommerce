const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  adminMiddleware,
  userMiddleware,
} = require("../middlewares/authMiddleware");
const {
  signupValidation,
  loginValidation,
  isRequestValidated,
} = require("../validators/authValidate");

const { createUser, loginUserCtrl } = require("../controller/authCtrl");

router.post("/signup", signupValidation, isRequestValidated, createUser);
router.post("/login", loginValidation, isRequestValidated, loginUserCtrl);

module.exports = router;
