import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Adminlogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const interceptor = axios.interceptors.request.use((req) => {
      const token = localStorage.getItem("token");

      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }

      return req;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const res = await axios.post(
        "https://cattlemanagement.runasp.net/gaushala/Auth/Login",
        {
          Username: form.username,
          Password: form.password,
        },
      );

      console.log("API Response:", res.data);

      if (res.data) {
        setMessage("Login Successfully");

        localStorage.setItem("token", res.data.token || "admin");

        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        setMessage(
          error.response.data.message || "Invalid Username or Password",
        );
      } else {
        setMessage("Server Error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handlesubmit}
          className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-lg">
              <i className="fa-solid fa-user-shield text-3xl text-indigo-600"></i>
            </div>

            <h1 className="text-3xl font-bold text-white">Admin Login</h1>

            <p className="text-gray-200 mt-2">Welcome Back Admin</p>
          </div>

          {/* Username */}
          <div className="mb-5">
            <label className="block text-white mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handlechange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-white mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handlechange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full fs-5 mt-3 bg-white text-indigo-800 font-bold py-3 rounded-xl hover:bg-indigo-100 transition duration-300 shadow-lg"
          >
            Login
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-center mt-5 font-semibold ${
                message === "Login Successfully"
                  ? "text-green-300"
                  : "text-red-300"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Adminlogin;
