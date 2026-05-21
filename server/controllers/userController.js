const User = require("../models/User");

// GET PROFILE
const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    res.json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// UPDATE PREFERENCES
const updatePreferences = async (req, res) => {

  try {

    const { preferences } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    user.preferences = preferences;

    await user.save();

    res.json({
      message: "Preferences Updated Successfully",
      preferences: user.preferences,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  getProfile,
  updatePreferences,
};