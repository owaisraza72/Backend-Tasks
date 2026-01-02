import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name,
        email,
        password,
        age,
        gender,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: response.data.message || "Welcome aboard!",
        timer: 2000,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#f3f4f6",
      });

      setName("");
      setEmail("");
      setPassword("");
      setAge("");
      setGender("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.response?.data?.message || error.message,
        background: "#1f2937",
        color: "#f3f4f6",
      });
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        console.log("Users fetched:", response.data);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
        <header className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-400 mt-2">Join our community today</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              required
            />
          </div>

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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Age
              </label>
              <input
                type="number"
                placeholder="25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>
          </div>

          <div className="py-2">
            <span className="block text-sm font-medium text-gray-300 mb-3">
              Gender
            </span>
            <div className="flex items-center space-x-6">
              {["Male", "Female", "Other"].map((option) => (
                <label
                  key={option}
                  className="flex items-center cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={gender === option}
                      onChange={(e) => setGender(e.target.value)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-600 checked:border-blue-500 transition-all"
                      required
                    />
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="ml-2.5 text-gray-300 group-hover:text-white transition-colors">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transform active:scale-[0.98] transition-all"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Already have an account?
          <Link to="/login">
            <span className="text-blue-400 cursor-pointer hover:underline">
              Log in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
