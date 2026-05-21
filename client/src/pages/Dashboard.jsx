import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("technology");

  const navigate = useNavigate();

  // FETCH NEWS
  const fetchNews = async (cat) => {

    try {

      setLoading(true);

      const res = await API.get(
        `/news?category=${cat}&t=${Date.now()}`
      );

      setNews(res.data);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }
  };

  // CATEGORY CHANGE
  useEffect(() => {

    fetchNews(category);

  }, [category]);

  // AUTH CHECK
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

  }, []);

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="bg-black text-white px-8 py-5 flex flex-col md:flex-row justify-between items-center shadow-lg sticky top-0 z-50">

        <div>

          <h1 className="text-3xl font-extrabold tracking-wide">
            NewsPulse
          </h1>

          <p className="text-gray-400 text-sm">
            Real-Time Breaking News Alerts
          </p>

        </div>

        <div className="flex gap-3 mt-4 md:mt-0">

          <button
            onClick={() => navigate("/profile")}
            className="bg-gray-800 hover:bg-gray-700 transition px-5 py-2 rounded-full text-sm font-medium"
          >
            Profile
          </button>

          <button
            onClick={() => navigate("/preferences")}
            className="bg-blue-600 hover:bg-blue-500 transition px-5 py-2 rounded-full text-sm font-medium"
          >
            Preferences
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-500 transition px-5 py-2 rounded-full text-sm font-medium"
          >
            Logout
          </button>

        </div>

      </div>

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white px-8 py-14">

        <div className="max-w-5xl mx-auto">

          <p className="uppercase tracking-widest text-gray-400 text-sm mb-2">
            Live News Dashboard
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            Stay Updated With Breaking News Across The World
          </h2>

          <p className="mt-5 text-gray-300 text-lg max-w-2xl">
            Personalized real-time news alerts powered by MERN Stack.
          </p>

        </div>

      </div>

      {/* CATEGORY FILTER */}
      <div className="sticky top-[88px] z-40 bg-white shadow-sm">

        <div className="overflow-x-auto scrollbar-hide">

          <div className="flex gap-3 px-6 md:px-10 py-4 min-w-max">

            {[
              "technology",
              "ai",
              "artificial intelligence",
              "machine learning",
              "chatgpt",
              "openai",
              "social media",
              "instagram",
              "youtube",
              "facebook",
              "twitter",
              "sports",
              "cricket",
              "football",
              "wwe",
              "business",
              "finance",
              "stock market",
              "economy",
              "startups",
              "politics",
              "crime",
              "health",
              "fitness",
              "science",
              "space",
              "cybersecurity",
              "hacking",
              "cryptocurrency",
              "bitcoin",
              "blockchain",
              "entertainment",
              "movies",
              "music",
              "gaming",
              "esports",
              "world",
              "india",
              "climate",
              "education",
              "travel",
              "food",
              "fashion",
              "automobile",
              "electric vehicles",
              "tesla",
              "apple",
              "google",
              "microsoft",
              "coding",
              "web development",
              "react",
              "mern stack",
              "startup funding",
              "war",
              "breaking news",
              "viral",
            ].map((cat) => (

              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  category === cat
                    ? "bg-black text-white border-black scale-105"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                }`}
              >
                {cat.toUpperCase()}
              </button>

            ))}

          </div>

        </div>

      </div>

      {/* NEWS SECTION */}
      <div className="px-6 md:px-10 py-10">

        {loading ? (

          <div className="flex justify-center items-center h-64">

            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black"></div>

          </div>

        ) : news.length === 0 ? (

          <div className="text-center text-gray-500 py-20 text-xl font-medium">
            No news found.
          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {news.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >

                {/* IMAGE */}
                {item.urlToImage ? (

                  <img
                    src={item.urlToImage}
                    alt="news"
                    className="w-full h-56 object-cover"
                  />

                ) : (

                  <div className="h-56 bg-gray-300 flex items-center justify-center text-gray-600">
                    No Image
                  </div>

                )}

                {/* CONTENT */}
                <div className="p-6">

                  <div className="flex justify-between items-center mb-3">

                    <span className="bg-black text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                      {category}
                    </span>

                    <span className="text-gray-400 text-xs">
                      LIVE
                    </span>

                  </div>

                  <h2 className="text-xl font-bold mb-3 leading-snug line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                    {item.description}
                  </p>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-500 transition text-white px-5 py-2 rounded-full text-sm font-medium"
                  >
                    Read Full Article
                  </a>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}