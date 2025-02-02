import { motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "../home/buttonComponent";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { nanoid } from "nanoid";
import Women from "../assets/women.png";
import men from "../assets/men.png";

const Profile = () => {
  const Password = () => {};
  const changeName = () => {};
  const picChange = () => {
    console.log("hello");
  };
  const setting = [
    {
      name: "Password",
      method: Password,
    },
    {
      name: "Name",
      method: changeName,
    },
    {
      name: "profile pic ",
      method: picChange,
    },
  ];
  const data = "men"; // hear change give actual data
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className=" border-white border-2 text-white rounded-lg shadow-lg p-4 w-full max-w-md h-auto overflow-y-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-3xl focus:outline-none float-right h-5 w-fit"
            >
              <FiX />
            </button>
            <ul className="grid col-span-1 mt-8">
              {setting.length > 0 ? (
                setting.map(({ name, method }) => (
                  <li
                    key={nanoid()}
                    className="h-12 bg-gray-400 rounded-md m-2 font-bold text-2xl flex items-center justify-center mt-5 hover:cursor-pointer"
                    onClick={method}
                  >
                    {name}
                  </li>
                ))
              ) : (
                <li>No results found</li>
              )}
            </ul>
            <div className="flex items-center justify-center mt-4 overflow-hidden">
              {data === "men" ? (
                <img src={men} className="h-52 rounded-lg" />
              ) : (
                <img src={Women} className="h-80 rounded-lg" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div
        className={`min-h-screen flex bg-white mt-8 ${
          isOpen ? "opacity-20 pointer-events-none z-10" : ""
        }`}
      >
        {/* Sidebar */}
        <div className="hidden md:flex w-1/6 bg-[#121212] text-white items-center justify-center py-10 px-5">
          <div className="text-3xl md:text-5xl lg:text-7xl font-semibold transform -rotate-90 whitespace-nowrap bg-profile">
            Hello, Aevam
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {/* Left Side - Image */}
          <div className="flex items-center justify-center p-5">
            <img
              src="https://imgs.search.brave.com/FYmsuChFcB46GmHEP9uO7qHz1b2vSK1YhJWr8s8m7sM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzE4LzA0LzYz/LzM2MF9GXzcxODA0/NjM2NF9rWGtTWGJG/dVZHeHNBNXVxZFlj/S0Q5SllIMlVrTjVi/Ui5qcGc"
              alt="Profile"
              className="object-cover w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg"
            />
          </div>

          {/* Right Side - Text */}
          <div className="flex flex-col justify-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Our Story
            </h1>
            <p className="text-gray-600 mb-4">
              Read the story of four girls who have carved out their space in
              the world.
            </p>

            {/* Button Container */}
            <div className="flex space-x-4 mb-4 items-center justify-center flex-col lg:flex-row md:flex-row">
              <Link to={"/showfollower"}>
                <Button description={"Follow"} />
              </Link>
              <Button description={"Follower"} />
              <Button description={"Following"} />
            </div>

            <a
              href="#"
              className="font-semibold text-black uppercase hover:underline"
            >
              See all posts
            </a>
          </div>
        </div>

        {/* Menu Button */}
        <div className="h-fit w-fit mt-10 mr-5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl focus:outline-none text-black"
          >
            {!isOpen && <FiMenu />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
