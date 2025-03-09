import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { Button } from "../home/buttonComponent";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { nanoid } from "nanoid";
import eye from "../assets/eye.jpeg";
import { ImCamera } from "react-icons/im";
import { FaCheck, FaTimes } from "react-icons/fa";
import NatureProfileCard from "./show_Profile.jsx";
import owal from "../assets/owal.png";

const Profile = () => {
  const inputRefrence = useRef(null);
  const Password = () => {};
  const changeName = () => {};
  const picChange = () => {
    inputRefrence.current.click();
  };
  const edit_Pic = () => {};
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
      name: "Edit pic",
      method: edit_Pic,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState("");
  const [error, setError] = useState("");
  const handeleNewImage = (event) => {
    // console.log(event.target.files);
    const myimgfile = event.target.files[0];
    const typeOfFile = event.target.files[0].name.split(".")[1];
    const typeList = ["png", "jpeg", "jpg"];
    if (!typeList.some((List) => List == typeOfFile)) {
      // console.log(typeOfFile);
      setError("invalid file type");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(myimgfile);
      reader.onload = (event) => {
        setImg(event.target.result);
      };
    }
  };

  const save = () => {};

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
        <div className="fixed inset-0  bg-opacity-50 z-40 flex items-center justify-center p-4 h-fit mt-52">
          <div className=" border-white border-2 text-white rounded-lg shadow-lg p-4 w-full max-w-md h-auto overflow-y-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-3xl relative focus:outline-none float-right h-5 w-fit "
            >
              <FiX />
            </button>
            <div className="flex justify-center items-center relative">
              <div className="relative">
                <img
                  src={img || eye}
                  alt="Profile"
                  className="rounded-full w-52 h-52 object-cover ml-10"
                />
                <button onClick={picChange}>
                  <div className="absolute bottom-0 right-0 left-28 w-14 h-14 p-3 text-white bg-blue-800  rounded-full items-center flex justify-center">
                    <ImCamera className="w-16 h-16" />
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRefrence}
                      onChange={handeleNewImage}
                      onClick={() => setError("")}
                      accept="image/*"
                    />
                  </div>
                </button>
              </div>
            </div>
            {img && (
              <>
                <div className="flex mt-4 justify-center items-center">
                  <button
                    className="p-3 text-white bg-green-600 rounded-lg hover:bg-green-800 transition-colors duration-300 shadow-md mx-2 flex items-center"
                    onClick={save}
                  >
                    <FaCheck className="mr-2" /> Save
                  </button>
                  <button
                    className="p-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md mx-2 flex items-center"
                    onClick={() => setImg("")}
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              </>
            )}
            <ul className="grid col-span-1 mt-2">
              {setting.length > 0 ? (
                setting.map(({ name, method }) => (
                  <li
                    key={nanoid()}
                    className="h-12 bg-blue-400 rounded-md m-2 font-bold text-3xl flex items-center justify-center mt-5 hover:cursor-pointer abril-fatface-regular"
                    onClick={method}
                  >
                    {name}
                  </li>
                ))
              ) : (
                <li>No results found</li>
              )}
            </ul>
            <div>
              {error && (
                <div>
                  <h1 className="font-medium text-2xl text-red-400">{error}</h1>
                </div>
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
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
          {/* Left Side - Image */}
          <div className="flex items-center justify-center p-5">
            <img
              src={eye}
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
        <div className="h-fit w-fit mt-10 m-5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl focus:outline-none text-black"
          >
            {!isOpen && <FiMenu />}
          </button>
        </div>
      </div>

      <div
        className={`mt-10  w-full overflow-x-auto overflow-y-hidden  px-4 py-6 scroll-smooth snap-x snap-mandatory scrollbar-thin ${
          isOpen ? "opacity-20 pointer-events-none z-10" : ""
        }`}
      >
        <div className="flex space-x-4 w-[900px] sm:w-[1200px] bg-y md:w-[1500px] lg:w-[1800px]">
          <NatureProfileCard />
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;

