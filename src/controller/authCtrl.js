const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

const createUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User Already Exists");
    }
    const newUser = await User.create({
      ...req.body,
      username: randomUsername,
    });
    return res.json({ message: "User Created Successfuly" });
  } catch (error) {
    throw new Error(error);
  }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const { _id, fname, lname, email, role, fullName } = findUser;
    const token = generateToken({ _id, role: findUser.role });
    res.json({
      _id,
      fname,
      lname,
      fullName,
      email,
      role,
      token: token,
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = { createUser, loginUserCtrl };
