const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  signupValidation,
  loginValidation,
  isRequestValidated,
} = require("../../validators/authValidate");

const {
  createUser,
  loginUserCtrl,
} = require("../../controller/admin/adminCtrl");

router.post("/signup", signupValidation, isRequestValidated, createUser);
router.post("/login", loginValidation, isRequestValidated, loginUserCtrl);

module.exports = router;
