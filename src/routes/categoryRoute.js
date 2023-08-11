const express = require("express");
const router = express.Router();
const multer = require("multer");
const uniqueId = require("uniqid");
const path = require("path");
const {
  authMiddleware,
  adminMiddleware,
  userMiddleware,
} = require("../middlewares/authMiddleware");

const {
  createCategory,
  getCategory,
  getAllCategory,
} = require("../controller/categoryCtrl");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(path.dirname(__dirname), "images");
    console.log("Destination Path:", destinationPath);
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const uniqueFileName = Date.now() + "-" + file.originalname;
    console.log("Generated File Name:", uniqueFileName);
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  (req, res, next) => {
    // Use the multer middleware here to handle the file upload
    upload.single("categoryImage")(req, res, function (err) {
      if (err) {
        return res.status(500).json({ status: "error", message: err.message });
      }
      next(); // Continue to the createCategory handler
    });
  },
  createCategory
);
router.get("/:id", getCategory);
router.get("/", getAllCategory);

module.exports = router;
