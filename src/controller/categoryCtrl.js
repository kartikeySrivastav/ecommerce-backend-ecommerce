const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name, { lower: true }),
    };
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }
    const newCategory = await Category.create(categoryObj);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getCategory = await Category.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { createCategory, getCategory };
