import React from "react";
import owal from "../components/assets/owal.png";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      <div className="flex flex-col md:flex-row items-center max-w-6xl px-6">
        {/* Image with Message Box */}
        <div className="relative w-full md:w-1/2">
          <img
            src={owal}
            alt="owal"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
          {/* Message Box */}
          <div className="absolute top-8 right-4 bg-white  p-4 rounded-lg shadow-md max-w-xs ">
            {/* Triangle */}
            <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white transform rotate-45 bg-opacity-95 "></div>
            {/* Message */}
            <p className="text-lg font-bold text-gray-800 relative z-10">
              Looks like you're lost
            </p>
          </div>
        </div>

        {/* Text and Buttons */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 md:ml-8">
          <h1 className="text-5xl font-bold mb-4">Oops! Page Not Found</h1>
          <p className="text-xl mb-8">
            It looks like you've wandered off the path. Let's get you back on
            track!
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button
              onClick={() => navigate("/register")}
              className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-transform transform hover:scale-105"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/home")}
              className="bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition-transform transform hover:scale-105"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
