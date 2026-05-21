const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: String,
    title: String,
    category: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);