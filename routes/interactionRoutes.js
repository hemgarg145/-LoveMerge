const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

// 👍 Like a user
router.post("/like/:id", authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user);
    const likedUser = await User.findById(req.params.id);

    if (!likedUser) return res.status(404).json({ msg: "User not found" });

    // Avoid duplicates
    if (currentUser.likedUsers.includes(likedUser._id)) {
      return res.status(400).json({ msg: "User already liked" });
    }

    currentUser.likedUsers.push(likedUser._id);
    await currentUser.save();

    res.json({ msg: "User liked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// 👎 Dislike a user
router.post("/dislike/:id", authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user);
    const dislikedUser = await User.findById(req.params.id);

    if (!dislikedUser) return res.status(404).json({ msg: "User not found" });

    if (currentUser.dislikedUsers.includes(dislikedUser._id)) {
      return res.status(400).json({ msg: "User already disliked" });
    }

    currentUser.dislikedUsers.push(dislikedUser._id);
    await currentUser.save();

    res.json({ msg: "User disliked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
