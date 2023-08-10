const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_kEY, { expiresIn: "1h" });
};

module.exports = { generateToken };
