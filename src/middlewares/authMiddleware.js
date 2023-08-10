const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_Key);
        const user = await User.findById(decodedToken?.id);

        if (!user) {
          throw new Error("User not found");
        }

        req.user = user;
        if (user.role === "admin") {
          req.isAdmin = true;
        } else {
          req.isAdmin = false;
          res.status(403).json({
            error: "fail",
            message: "Access Denied",
          });
        }
        next();
      }
    } catch (error) {
      throw new Error("Authorized token expired, Please Login again");
    }
  } else {
    throw new Error("there is no token attached to header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
