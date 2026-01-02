import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please fill all the fields",
          background: "#1f2937",
          color: "#f3f4f6",
        });
        return;
      }
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: response.data.message || "Welcome back!",
        timer: 2000,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#f3f4f6",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || error.message,
        background: "#1f2937",
        color: "#f3f4f6",
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
        <header className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Login Account
          </h2>
          <p className="text-gray-400 mt-2">Join our community today</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transform active:scale-[0.98] transition-all"
          >
            Login Account
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Don't have an account?
          <Link to="/signup">
            <span className="text-blue-400 cursor-pointer hover:underline">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
