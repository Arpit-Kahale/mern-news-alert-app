import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Preferences() {

  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);

  const categories = [
    "technology",
    "ai",
    "sports",
    "business",
    "politics",
    "crime",
    "health",
    "finance",
    "entertainment",
    "gaming",
    "science",
    "space",
    "cryptocurrency",
    "cybersecurity",
    "world",
    "india",
    "startups",
    "coding",
    "social media",
    "climate",
  ];

  // FETCH USER PREFERENCES
  useEffect(() => {

    const fetchPreferences = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await API.get(
          "/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);

        if (res.data.preferences) {

          setSelected(res.data.preferences);

        }

      } catch (err) {

        console.log(err);

      }
    };

    fetchPreferences();

  }, []);

  // TOGGLE CATEGORY
  const toggleCategory = (category) => {

    if (selected.includes(category)) {

      setSelected(
        selected.filter(
          (item) => item !== category
        )
      );

    } else {

      setSelected([
        ...selected,
        category,
      ]);

    }
  };

  // SAVE PREFERENCES
  const savePreferences = async () => {

    try {

      const token = localStorage.getItem("token");

      console.log(selected);

      const res = await API.put(
        "/user/preferences",
        {
          preferences: selected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      alert("Preferences Updated Successfully");

      navigate("/profile");

    } catch (err) {

      console.log(err);

      alert("Failed To Update Preferences");

    }
  };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="bg-black text-white px-8 py-5 flex justify-between items-center shadow-lg">

        <div>

          <h1 className="text-3xl font-extrabold">
            NewsPulse
          </h1>

          <p className="text-gray-400 text-sm">
            Personalize Your News Feed
          </p>

        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Back
        </button>

      </div>

      {/* MAIN SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="text-center mb-12">

          <h2 className="text-5xl font-extrabold text-black">
            Choose Your Interests
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Select categories to receive personalized news updates and alerts.
          </p>

        </div>

        {/* CATEGORY GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {categories.map((category, index) => (

            <div
              key={index}
              onClick={() => toggleCategory(category)}
              className={`cursor-pointer rounded-3xl p-6 shadow-lg transition-all duration-300 border-2 hover:scale-105 ${
                selected.includes(category)
                  ? "bg-black text-white border-black"
                  : "bg-white border-gray-200 hover:border-black"
              }`}
            >

              <div className="flex justify-between items-center">

                <h3 className="text-lg font-bold capitalize">
                  {category}
                </h3>

                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selected.includes(category)
                      ? "bg-white border-white"
                      : "border-gray-400"
                  }`}
                >

                  {selected.includes(category) && (

                    <div className="w-3 h-3 bg-black rounded-full"></div>

                  )}

                </div>

              </div>

              <p className={`mt-3 text-sm ${
                selected.includes(category)
                  ? "text-gray-300"
                  : "text-gray-500"
              }`}>
                Personalized updates related to {category}.
              </p>

            </div>

          ))}

        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-center mt-14">

          <button
            onClick={savePreferences}
            className="bg-black hover:bg-gray-900 transition text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl"
          >
            Save Preferences
          </button>

        </div>

      </div>

    </div>
  );
}