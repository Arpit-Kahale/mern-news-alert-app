import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (err) {

      alert("Invalid Credentials");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex bg-black">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex-col justify-center px-20">

        <p className="uppercase tracking-[6px] text-gray-400 text-sm mb-5">
          Real-Time News Platform
        </p>

        <h1 className="text-6xl font-extrabold leading-tight">
          Stay Updated With Breaking News Worldwide
        </h1>

        <p className="mt-8 text-gray-300 text-lg leading-relaxed max-w-xl">
          Get personalized alerts, trending stories,
          AI-powered categories, and live updates —
          all in one modern platform.
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 px-6 py-10">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

          {/* TOP */}
          <div className="text-center mb-8">

            <h2 className="text-4xl font-extrabold text-black">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-3">
              Login to continue to NewsPulse
            </p>

          </div>

          {/* FORM */}
          <form onSubmit={handleLogin}>

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
                placeholder="Enter your password"
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
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* REGISTER */}
          <p className="text-center text-gray-600 mt-6">

            Don’t have an account?{" "}

            <Link
              to="/register"
              className="text-blue-600 hover:underline font-semibold"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}