const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getProfile,
  updatePreferences,
} = require("../controllers/userController");

// PROFILE
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// UPDATE PREFERENCES
router.put(
  "/preferences",
  authMiddleware,
  updatePreferences
);

module.exports = router;