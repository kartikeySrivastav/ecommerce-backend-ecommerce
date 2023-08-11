const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decodedToken?.id);

        if (!user) {
          throw new Error("User not found");
        }

        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Authorized token expired, Please Login again");
    }
  } else {
    throw new Error("there is no token attached to header");
  }
});

const adminMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "admin") {
      throw new Error("User is not an admin");
    }

    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error.message);
    res.status(403).json({ status: "error", message: "Admin access denied" });
  }
});

const userMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "user") {
      throw new Error("Admin access denied");
    }

    next();
  } catch (error) {
    console.error("User Middleware Error:", error.message);
    res.status(403).json({ status: "error", message: "Access denied" });
  }
});

module.exports = { authMiddleware, adminMiddleware, userMiddleware };
