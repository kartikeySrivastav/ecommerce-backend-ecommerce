const { check, validationResult } = require("express-validator");

exports.signupValidation = [
  check("fname").notEmpty().withMessage("first name is required"),
  check("lname").notEmpty().withMessage("last name is required"),
  check("email").isEmail().withMessage("valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

exports.loginValidation = [
  check("email").isEmail().withMessage("Invalid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

exports.isRequestValidated = async (req, res, next) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array().map((error) => error.msg);
    res.status(422).json({
      errors: errorArray,
    });
  } else {
    next();
  }
};
