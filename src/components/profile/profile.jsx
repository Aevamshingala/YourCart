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
import { CropeImage } from "../../cropper/cropper.jsx";
import { apiData } from "../../backend_connection/api_handler.js";
import cardData from "../temoData.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import ScrollCard from "../home/scrollCard.jsx";
const Profile = () => {
  const inputRefrence = useRef(null);
  const userName = useSelector(
    (state) => state?.auth?.userData?.user?.userName
  );

  const [proImg, setProImg] = useState("");
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const handleuser = async (userName) => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/user/follower${userName}`, //get method
      {
        withCredentials: true,
      }
    );
    console.log(response?.data?.data);

    if (response?.data?.success) {
      setLoading(false);

      setUser(response?.data?.data[0]);
      setProImg(response?.data?.data[0]?.avatar?.split("%")[0]);
      setIsFollow(user?.isfollow);
      console.log(user);
    } else {
      setLoading(false);
      setError(response?.data?.error);
      console.log(response);
    }
  };
  useEffect(() => {
    handleuser(userName);
  }, []);
  const [iscrop, setIsCrop] = useState(false);
  const Password = () => {};
  const changeName = () => {};
  const picChange = () => {
    inputRefrence.current.click();
  };
  const cropImage = () => {
    setIsCrop(!iscrop);
  };
  const Bio = () => {};
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
      name: "Bio",
      method: Bio,
    },
    {
      name: "crop image",
      method: cropImage,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState("");
  const [error, setError] = useState("");
  const [posts, setPosts] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpenPost, setIsOpenPost] = useState(false);

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
  const handlePost = async (Id) => {
    setIsOpenPost(true);
    const response = await apiData({
      url: "/userspost",
      data: {
        userId: Id,
      },
    });

    if (response?.data?.success) {
      setLoading(false);
      setPosts(response?.data?.data);
    } else {
      setLoading(false);
      setError(response?.data?.error);
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
          {iscrop && (
            <div className="flex flex-col items-center justify-center gap-6 p-6 bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-800">
              {/* Back Button */}
              <button
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out relative overflow-hidden group"
                onClick={() => setIsCrop(!iscrop)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back
                </span>
                <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-0 transition-all duration-300"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </button>

              {/* CropeImage Component */}
              <div className="w-full max-w-2xl">
                <CropeImage />
              </div>
            </div>
          )}
          {!iscrop && (
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
                    <h1 className="font-medium text-2xl text-red-400">
                      {error}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          )}
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
            Hello, {user?.userName}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
          {/* Left Side - Image */}
          <div className="flex items-center justify-center p-5">
            <img
              src={proImg}
              alt="Profile"
              className="object-cover w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg"
            />
          </div>

          {/* Right Side - Text */}
          <div className="flex flex-col justify-center px-4 items-center">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              {user?.userName}
            </h1>
            <p className="text-gray-600 mb-4">{user?.discription}</p>

            {/* Button Container */}
            <div className="flex space-x-4 mb-4 items-center justify-center flex-col lg:flex-row md:flex-row">
              <Link to={"/showfollower"}>
                <Button description={"Follow"} />
              </Link>
              <Button description={"Follower"} />
              <Button description={"Following"} />
            </div>

            <h4
              onClick={() => handlePost(user?._id)}
              className="font-semibold text-black uppercase hover:underline"
            >
              See all posts
            </h4>
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
      {isOpenPost && (
        <>
          <div className="fixed inset-0  bg-opacity-50 z-40  p-4 h-fit mt-52 bg-white">
            <div className="h-fit w-fit mt-10 m-5">
              <button
                onClick={() => setIsOpenPost(!isOpenPost)}
                className="text-3xl focus:outline-none text-black"
              >
                {isOpenPost && <FiX />}
              </button>
            </div>
            <div className="flex items-center justify-center overflow-x-auto">
              <ScrollCard cardData={cardData} />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Profile;

