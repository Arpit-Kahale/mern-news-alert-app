import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post(
        "/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/");

    } catch (err) {

      alert("Registration Failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex bg-black">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex-col justify-center px-20">

        <p className="uppercase tracking-[6px] text-gray-400 text-sm mb-5">
          Global News Network
        </p>

        <h1 className="text-6xl font-extrabold leading-tight">
          Create Your Personalized News Experience
        </h1>

        <p className="mt-8 text-gray-300 text-lg leading-relaxed max-w-xl">
          Choose your favorite categories,
          receive real-time notifications,
          and stay informed with intelligent news updates.
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 px-6 py-10">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

          {/* TOP */}
          <div className="text-center mb-8">

            <h2 className="text-4xl font-extrabold text-black">
              Create Account
            </h2>

            <p className="text-gray-500 mt-3">
              Join NewsPulse today
            </p>

          </div>

          {/* FORM */}
          <form onSubmit={handleRegister}>

            {/* NAME */}
            <div className="mb-5">

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
              />

            </div>

            {/* EMAIL */}
            <div className="mb-5">

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
              />

            </div>

            {/* PASSWORD */}
            <div className="mb-6">

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 transition text-white py-3 rounded-xl text-lg font-semibold shadow-lg"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* LOGIN */}
          <p className="text-center text-gray-600 mt-6">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-blue-600 hover:underline font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}