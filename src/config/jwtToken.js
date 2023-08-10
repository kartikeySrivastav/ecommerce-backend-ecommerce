const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET_kEY, {
    expiresIn: "3h",
  });
};

module.exports = { generateToken };
