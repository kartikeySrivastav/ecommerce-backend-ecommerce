const express = require("express");
const router = express.Router();
const multer = require("multer");
const uniqueId = require("uniqid");
const path = require("path");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createProduct } = require("../controller/productCtrl");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "product"));
  },
  filename: function (req, file, cb) {
    const uniqueFileName = uniqueId() + path.extname(file.originalname);
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

router.post("/", authMiddleware, upload.array("productImage"), createProduct);

module.exports = router;
