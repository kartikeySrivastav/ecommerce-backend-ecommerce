const User = require("../../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../../config/jwtToken");

const createUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email, role: "user" });
    const existingAdmin = await User.findOne({ email, role: "admin" });

    if (existingUser) {
      throw new Error("User with the same email already exists");
    }

    if (existingAdmin) {
      throw new Error("Admin with the same email already exists");
    }
    const newAdmin = await User.create({
      ...req.body,
      username: Math.random().toString(),
      role: "admin",
    });
    return res.json({ message: "Admin created Successfully..!" });
  } catch (error) {
    throw new Error(error);
  }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (
    findUser &&
    (await findUser.isPasswordMatched(password)) &&
    findUser?.role === "admin"
  ) {
    const { _id, fname, lname, email, role, fullName } = findUser;
    const token = generateToken({ _id, role: findUser?.role });
    res.cookie("token", token, { expiresIn: "1d" });
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

const signOutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Signout Successfuly " });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { createUser, loginUserCtrl, signOutUser };
