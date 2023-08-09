const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");


const createUser = asyncHandler(async (req, res) => {

  // Check for existing users with the same username or email
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // generate a random username
    const randomUsername = Math.random().toString();
    // Create the user object with the generated random username
    const newUser = await User.create({
      ...req.body,
      username: randomUsername,
    });
    return res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const { _id, fname, lname, email, role, fullName } = findUser;
    res.json({
      _id,
      fname,
      lname,
      fullName,
      email,
      role,
      token: generateToken({ _id }),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = { createUser, loginUserCtrl };
