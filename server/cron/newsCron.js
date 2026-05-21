const User = require("../models/User");
const axios = require("axios");
const nodemailer = require("nodemailer");

const sendNewsEmails = async () => {
  try {
    const users = await User.find();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (let user of users) {
      const category = user.categories[0] || "technology";

      const news = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWS_API_KEY}`
      );

      const articles = news.data.articles.slice(0, 3);

      const content = articles
        .map((a) => `• ${a.title}`)
        .join("\n");

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: "📰 Your Daily News Alert",
        text: content,
      });
    }

    console.log("Emails sent successfully");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = sendNewsEmails;