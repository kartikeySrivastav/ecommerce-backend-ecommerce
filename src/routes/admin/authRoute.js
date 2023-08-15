const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  adminMiddleware,
} = require("../../middlewares/authMiddleware");
const {
  signupValidation,
  loginValidation,
  isRequestValidated,
} = require("../../validators/authValidate");

const {
  createUser,
  loginUserCtrl,
  signOutUser,
} = require("../../controller/admin/adminCtrl");

router.post("/signup", signupValidation, isRequestValidated, createUser);
router.post("/login", loginValidation, isRequestValidated, loginUserCtrl);
router.post("/signout", authMiddleware, signOutUser);

module.exports = router;
