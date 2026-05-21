import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

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

        setUser(res.data);

      } catch (err) {

        console.log(err);

      }
    };

    fetchProfile();

  }, []);

  if (!user) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gray-100">

        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black"></div>

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-gray-100">

      {/* TOP NAVBAR */}
      <div className="bg-black text-white px-8 py-5 flex justify-between items-center shadow-lg">

        <div>

          <h1 className="text-3xl font-extrabold">
            NewsPulse
          </h1>

          <p className="text-gray-400 text-sm">
            User Profile Dashboard
          </p>

        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Back to Dashboard
        </button>

      </div>

      {/* PROFILE SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT CARD */}
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            {/* AVATAR */}
            <div className="w-32 h-32 mx-auto rounded-full bg-black text-white flex items-center justify-center text-5xl font-bold shadow-lg">

              {user.name?.charAt(0).toUpperCase()}

            </div>

            <h2 className="text-3xl font-bold mt-6">
              {user.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {user.email}
            </p>

            <div className="mt-6">

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                Active Member
              </span>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* ACCOUNT DETAILS */}
            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h3 className="text-2xl font-bold mb-6">
                Account Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <p className="text-gray-500 text-sm mb-2">
                    Full Name
                  </p>

                  <div className="bg-gray-100 rounded-xl px-4 py-4 font-semibold">
                    {user.name}
                  </div>

                </div>

                <div>

                  <p className="text-gray-500 text-sm mb-2">
                    Email Address
                  </p>

                  <div className="bg-gray-100 rounded-xl px-4 py-4 font-semibold">
                    {user.email}
                  </div>

                </div>

              </div>

            </div>

            {/* PREFERENCES */}
            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h3 className="text-2xl font-bold mb-6">
                News Preferences
              </h3>

              <div className="flex flex-wrap gap-4">

                {user.preferences &&
                user.preferences.length > 0 ? (

                  user.preferences.map((pref, index) => (

                    <div
                      key={index}
                      className="bg-black text-white px-5 py-3 rounded-full text-sm font-semibold shadow-md"
                    >
                      {pref}
                    </div>

                  ))

                ) : (

                  <p className="text-gray-500">
                    No preferences selected.
                  </p>

                )}

              </div>

            </div>

            {/* ACTIVITY */}
            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h3 className="text-2xl font-bold mb-6">
                Activity Overview
              </h3>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-gray-100 rounded-2xl p-6 text-center">

                  <h4 className="text-4xl font-extrabold text-black">
                    {user.preferences?.length || 0}
                  </h4>

                  <p className="text-gray-500 mt-2">
                    Selected Categories
                  </p>

                </div>

                <div className="bg-gray-100 rounded-2xl p-6 text-center">

                  <h4 className="text-4xl font-extrabold text-black">
                    24/7
                  </h4>

                  <p className="text-gray-500 mt-2">
                    Live News Updates
                  </p>

                </div>

                <div className="bg-gray-100 rounded-2xl p-6 text-center">

                  <h4 className="text-4xl font-extrabold text-black">
                    Active
                  </h4>

                  <p className="text-gray-500 mt-2">
                    Email Notifications
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}