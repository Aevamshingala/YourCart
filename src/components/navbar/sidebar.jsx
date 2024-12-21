import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiInfo, FiPhone, FiGithub } from "react-icons/fi";
import Searchbar from "./searchbar";
import { Link } from "react-router-dom";

export function Sidebar({ setIsOpen }) {
  // When sidebar is open, lock the page's scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = "0";
    document.body.style.left = "0";
    document.body.style.width = "100%";
    document.body.style.height = "100vh"; // Lock full height of body

    // Unlock scrolling when sidebar is closed
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "relative"; // Restore normal position
      document.body.style.height = "auto"; // Restore normal height
    };
  }, [setIsOpen]);
  return (
    <div className="lg:hidden fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-opacity-95 z-50 flex flex-col items-center pt-16 text-white shadow-xl transition-transform duration-300">
      {/* Logo and Search */}
      <div className="flex items-center justify-between w-full px-6 py-4 bg-gray-800 shadow-md">
        <div className="flex items-center space-x-2">
          <Link to={"/profile"}>
            <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full">
              <button onClick={() => setIsOpen(false)}>🌊</button>
            </div>
          </Link>
          <h1 className="text-xl font-semibold">userName</h1>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-xl font-bold text-gray-400 hover:text-white focus:outline-none"
        >
          ✕
        </button>
      </div>

      {/* Searchbar */}
      <div className="w-10/12 my-4">
        <Searchbar />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col w-10/12 mt-6 space-y-4">
        <NavLink
          onClick={() => setIsOpen(false)}
          to="/"
          className="flex items-center px-4 py-2 text-lg rounded-lg hover:bg-blue-500 hover:text-white transition duration-200"
        >
          <FiHome className="mr-3 text-xl" />
          Home
        </NavLink>
        <NavLink
          onClick={() => setIsOpen(false)}
          to="/about"
          className="flex items-center px-4 py-2 text-lg rounded-lg hover:bg-blue-500 hover:text-white transition duration-200"
        >
          <FiInfo className="mr-3 text-xl" />
          About
        </NavLink>
        <NavLink
          onClick={() => setIsOpen(false)}
          to="/contact"
          className="flex items-center px-4 py-2 text-lg rounded-lg hover:bg-blue-500 hover:text-white transition duration-200"
        >
          <FiPhone className="mr-3 text-xl" />
          Contact
        </NavLink>
        <NavLink
          onClick={() => setIsOpen(false)}
          to="/github"
          className="flex items-center px-4 py-2 text-lg rounded-lg hover:bg-blue-500 hover:text-white transition duration-200"
        >
          <FiGithub className="mr-3 text-xl" />
          GitHub
        </NavLink>
      </div>
    </div>
  );
}
