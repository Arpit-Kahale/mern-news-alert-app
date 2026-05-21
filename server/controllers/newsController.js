const axios = require("axios");

const getNews = async (req, res) => {
  try {
    const category = req.query.category || "technology";

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
    );

    res.json(response.data.articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getNews };