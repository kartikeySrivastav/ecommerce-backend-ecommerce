const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  //   res.json({ file: req.files, body: req.body });
  try {
    const { name, price, quantity, description, category } = req.body;

    let productImages = [];

    if (req.files.length > 0) {
      productImages = req.files.map((file) => {
        return { img: file.filename };
      });
    }

    const product = new Product({
      name: req.body.name,
      slug: slugify(name, { lower: true }),
      price,
      description,
      quantity,
      productImages,
      category,
      createdBy: req.user?._id,
    });

    const newProduct = await Product.create(product);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createProduct };
