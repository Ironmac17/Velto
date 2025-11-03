const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { getProfile, updateProfile, uploadAvatar } = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// ✅ Routes
router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.post("/avatar", protect, upload.single("avatar"), uploadAvatar);

module.exports = router;
