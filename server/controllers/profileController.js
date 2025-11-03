const path = require("path");
const User = require("../models/User");

// ✅ Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update user profile
const updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body; // only these should be editable for now

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Upload profile image
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImageUrl: filePath },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ profileImageUrl: filePath });
  } catch (err) {
    console.error("uploadAvatar error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
};
