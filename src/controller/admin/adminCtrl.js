const User = require("../../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../../config/jwtToken");

const createUser = asyncHandler(async (req, res) => {
  // Check for existing users with the same username or email
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // generate a random username
    const randomUsername = Math.random().toString();
    // Create the user object with the generated random username
    const newAdmin = await User.create({
      ...req.body,
      username: randomUsername,
      role: "admin",
    });
    return res.json(newAdmin);
  } else {
    throw new Error("Admin Already Exists");
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

// get a user
const getUser = asyncHandler(async (req, res) => {});
module.exports = { createUser, loginUserCtrl };
