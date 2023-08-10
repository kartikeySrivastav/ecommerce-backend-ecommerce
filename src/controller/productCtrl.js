const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const uniqueId = require("uniqid");

const createProduct = asyncHandler(async (req, res) => {
  res.json({ file: req.files, body: req.body });
});

module.exports = { createProduct };
