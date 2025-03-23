import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Card from "../home/card";
import {
  FiUserMinus,
  FiUserPlus,
  FiMessageCircle,
  FiMapPin,
} from "react-icons/fi";
import { apiData } from "../../backend_connection/api_handler";
import axios from "axios";
import { FiX } from "react-icons/fi";
import ScrollCard from "../home/scrollCard.jsx";
import cardData from "../temoData.js";

function FindProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { userName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [proImg, setProImg] = useState("");
  const [isfollow, setIsFollow] = useState(false);

  const handleuser = async (userName) => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/user/follower${userName}`, //get method
      {
        withCredentials: true,
      }
    );
    // console.log(response?.data?.data);

    if (response?.data?.success) {
      setLoading(false);

      setUser(response?.data?.data[0]);
      setProImg(user?.avatar?.split("%")[0]);
      setIsFollow(user.isfollow);
      console.log(user);
    } else {
      setLoading(false);
      setError(response?.data?.error);
      console.log(response);
    }
  };
  const handlePost = async (Id) => {
    setIsOpen(true);
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
  console.log(posts);

  useEffect(() => {
    handleuser(userName);
  }, [userName]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center border-black"
    >
      <div
        className={`min-h-screen flex bg-slate-100 ${
          isOpen && "pointer-events-none z-10 opacity-20"
        }`}
      >
        <div className="flex-1 p-8">
          {/* Profile Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Profile Image */}
            <div className="flex items-center justify-center">
              <img
                src={proImg}
                alt="Profile"
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              />
            </div>

            {/* Profile Details */}
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                {user.userName}
              </h1>
              <p className="text-gray-600">{user.discription}</p>

              {/* Location */}
              <div className="flex items-center space-x-2 text-gray-600">
                <FiMapPin />
                <span>{user.Location}</span>
              </div>

              {/* Follower and Following Count */}
              <div className="flex space-x-6">
                <div>
                  <span className="font-bold text-black">
                    {user?.followerCount}
                  </span>
                  <span className="text-gray-600"> Followers</span>
                </div>
                <div>
                  <span className="font-bold text-black">
                    {user?.followeingCount}
                  </span>
                  <span className="text-gray-600"> Following</span>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex items-center bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300">
                  {isfollow ? (
                    <FiUserMinus className="mr-1" />
                  ) : (
                    <FiUserPlus className="mr-1" />
                  )}
                  {isfollow ? "unfollow" : "follow"}
                </button>
                <button className="flex items-center bg-transparent border border-black text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-300">
                  <FiMessageCircle className="mr-1" />
                  Message
                </button>
              </div>

              <h4
                onClick={() => handlePost(user?._id)}
                className="font-semibold text-black uppercase hover:underline"
              >
                See all posts
              </h4>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0  bg-opacity-50 z-40  p-4 h-fit mt-52 bg-white">
            <div className="h-fit w-fit mt-10 m-5">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-3xl focus:outline-none text-black"
              >
                {isOpen && <FiX />}
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
}

export default FindProfile;
