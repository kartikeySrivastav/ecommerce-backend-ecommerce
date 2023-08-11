const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const API_URL = process.env.API_URL;

const createCategory = asyncHandler(async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name, { lower: true }),
    };
    if (req.file) {
      categoryObj.categoryImage =
        process.env.API_URL + "/images/" + req.file.filename;
    }

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

const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories) {
      const categoryList = createCategories(categories);
      res.json(categoryList);
    }
  } catch (error) {
    throw new Error(error);
  }
});

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cate) => cate.parentId == undefined);
  } else {
    category = categories.filter((cate) => cate.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate?._id,
      name: cate?.name,
      slug: cate?.slug,
      children: createCategories(categories, cate?._id),
    });
  }

  return categoryList;
}
module.exports = { createCategory, getCategory, getAllCategory };
