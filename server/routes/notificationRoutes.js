const express = require("express");

const router = express.Router();

const sendEmail =
  require("../utils/sendEmail");

// DEFAULT ROUTE
router.get("/", (req, res) => {

  res.json({
    message:
      "Notifications route working",
  });

});

// TEST EMAIL ROUTE
router.post(
  "/test-email",
  async (req, res) => {

    try {

      await sendEmail(

        "arpitkahale@gmail.com",

        "NewsPulse Test Email 🚀",

        "Brevo Email Service Working Successfully"

      );

      res.json({
        message:
          "Test Email Sent Successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed To Send Email",
      });

    }
  }
);

module.exports = router;