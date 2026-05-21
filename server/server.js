const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// CORS
app.use(
  cors({
    origin: "https://mern-news-alert-app.vercel.app",
    credentials: true,
  })
);

// MIDDLEWARE
app.use(express.json());

// ROUTES
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/news", newsRoutes);

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("NewsPulse Backend Running");
});

// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});