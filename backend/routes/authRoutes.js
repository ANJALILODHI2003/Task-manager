const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // for /upload-image only

const router = express.Router();

// Register user (optional profileImageUrl from frontend)
// Register user with optional profile image
router.post("/register", upload.single("profileImage"), registerUser);


// Update profile (with optional new profile image)
router.put("/profile", protect, upload.single("profileImage"), updateUserProfile);

// Login
router.post("/login", loginUser);

// Get profile
router.get("/profile", protect, getUserProfile);

// Upload image API
router.post("/upload-image", protect, upload.single("image"), (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image upload failed" });
    }
    res.json({ imageUrl: req.file.path });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error while uploading image" });
  }
});

module.exports = router;
