<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap');
</style>;

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.jpeg";
import Searchbar from "./searchbar";
import { Sidebar } from "./sidebar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-800 shadow-lg rounded-2xl">
      <nav className="flex items-center justify-between p-4">
        {/* Logo and Name */}
        <Link
          to="https://www.instagram.com/yourcart2924/"
          className="flex items-center space-x-3"
        >
          <img src={logo} alt="Logo" className="h-12 md:h-16 rounded-full" />
          <h1 className="text-xl md:text-2xl font-semibold text-white">
            YourCart
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-6 text-white">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${
                isActive ? " text-blue-500" : "text-white"
              }block py-2 pr-4 pl-3 duration-200 border-b border-blue-100 hover:bg-blue-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-500 lg:p-0 text-lg`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${
                isActive ? " text-blue-500" : "text-white"
              }block py-2 pr-4 pl-3 duration-200 border-b border-blue-100 hover:bg-blue-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-500 lg:p-0 text-lg`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/allprofile"
            className={({ isActive }) =>
              `${
                isActive ? " text-blue-500" : "text-white"
              }block py-2 pr-4 pl-3 duration-200 border-b border-blue-100 hover:bg-blue-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-500 lg:p-0 text-lg`
            }
          >
            Profiles
          </NavLink>
          <NavLink
            to="/gemini"
            className={({ isActive }) =>
              `${
                isActive ? " text-blue-500" : "text-white"
              }block py-2 pr-4 pl-3 duration-200 border-b border-blue-100 hover:bg-blue-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-500 lg:p-0 text-lg`
            }
          >
            Gemini
          </NavLink>
        </div>

        {/* Search bar and Icons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Searchbar />
          <Link to={"/profile"}>
            <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full">
              🌊
            </div>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white text-2xl focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Sidebar for Mobile */}
      {isOpen && <Sidebar setIsOpen={setIsOpen} />}
    </header>
  );
}
