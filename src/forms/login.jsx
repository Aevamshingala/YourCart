import React from "react";
import { useState, useEffect } from "react";
import Message from "../Message.jsx";
import valid from "webvalid";
import { apiData } from "../backend_connection/api_handler.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Myuser } from "../authservices/authSlice.js";
function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userName || !email || !password) {
        setError("All fields are required.");
        return;
      }
      if (!valid.validEmail(email)) {
        setError("please fill email correctly");
        return;
      }
      if (!password.length === 6) {
        setError("password must be 6 digit");
        return;
      }
      if (!/^\S+$/.test(userName)) {
        setError(`space is not allow between name`);
        return;
      }
      if (!isNaN(userName)) {
        setError(`please enter name correctly`);
        return;
      }

      const response = await apiData({
        url: "/login",
        data: {
          userName,
          email,
          password,
        },
      });
      console.log(response?.data?.data);

      if (response?.data?.success) {
        dispatch(Myuser(response?.data?.data));
        setMessage(response?.data?.message);

        const timer = setTimeout(() => {
          navigate("/home");
        }, 3000);

        return () => clearTimeout(timer);
      } else {
        console.log(response);
        setError(response?.data?.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    const clear = setTimeout(() => {
      setError("");
      setMessage("");
    }, 6000);
    return () => {
      clearTimeout(clear);
    };
  }, [error, message]);
  return (
    <div className="flex justify-center items-center">
      {error && (
        <Message
          title={error && "Problem"}
          message={error}
          titleColor="#ffffff"
          messageColor="#f0f0f0"
          customStyles={{ top: "10%", right: "10%" }}
        />
      )}
      {message && (
        <Message
          title={message && "Success"}
          message={message}
          titleColor="#ffffff"
          messageColor="#f0f0f0"
          customStyles={{
            top: "10%",
            right: "10%",
          }}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-2xl rounded-lg p-8 w-96 border border-gray-700"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Login to Your Account
        </h2>

        {/* Username Input */}
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value.trim())}
          placeholder="Username"
          className="w-full mt-2 py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 font-medium focus:border-blue-400 focus:ring focus:ring-blue-500 focus:outline-none placeholder-gray-400"
        />

        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mt-2 py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 font-medium focus:border-blue-400 focus:ring focus:ring-blue-500 focus:outline-none placeholder-gray-400"
        />

        {/* Password Input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mt-2 py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 font-medium focus:border-blue-400 focus:ring focus:ring-blue-500 focus:outline-none placeholder-gray-400"
          min={6}
        />

        {/* Submit Button */}
        <input
          type="submit"
          value="Login"
          className="w-full mt-6 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
        />
        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Messages */}
        <div className="w-full">
          {message && (
            <div className="mt-2 p-2 bg-green-900 text-green-300 rounded w-full">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-2 p-2 bg-red-900 text-red-300 rounded w-full">
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
