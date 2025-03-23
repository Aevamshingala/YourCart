import React, { useState } from "react";
import cardData from "../temoData";
import { nanoid } from "nanoid";
import { Button } from "../home/buttonComponent";
import Category from "../home/category";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import LikeShow from "../likeShow.jsx";
import { BsPersonCircle } from "react-icons/bs";
import owal from "../assets/owal.png";

function CategoryCard() {
  const [isShow, setIsShow] = useState(null);
  const [followedCreators, setFollowedCreators] = useState({});
  const [likedCards, setLikedCards] = useState({});
  const navigate = useNavigate();

  const handleClick = (i) => {
    setIsShow(isShow === i ? null : i);
  };

  const handleLike = (i) => {
    setLikedCards((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const handleFollow = (creatorId) => {
    setFollowedCreators((prev) => ({ ...prev, [creatorId]: !prev[creatorId] }));
  };
  const handleProfile = (userName) => {
    navigate(`/findprofile/${userName}`);
  };
  return (
    <div className="w-full p-4 grid grid-cols-1 gap-6">
      <Category />
      {cardData.map(
        ({ title, imageUrl, description, link, creator }, index) => (
          <div
            className="bg-white bg-opacity-95 rounded-2xl shadow-lg p-4 flex flex-col items-center md:flex-row"
            key={nanoid()}
          >
            <div className="w-full md:w-1/3 lg:w-2/3 flex justify-center">
              <img
                src={imageUrl}
                alt={title}
                className="w-32 h-32 md:w-40 md:h-40 lg:w-80 lg:h-80 rounded-full object-cover"
              />
            </div>

            <div className="w-full md:w-2/3 bg-white rounded-2xl p-4 md:p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <img
                    src={creator?.avatar || owal}
                    alt={creator?.userName || "Unknown"}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300 mr-2 cursor-pointer"
                    onClick={() => handleProfile(creator?.userName)}
                  />
                  <p className="text-sm md:text-lg font-semibold text-gray-700">
                    {creator?.name || "Unknown"}
                  </p>
                </div>
                <button
                  onClick={() => handleFollow(creator?.id)}
                  className={`px-3 py-1 text-xs md:text-sm font-medium rounded-full transition-all ${
                    followedCreators[creator?.id]
                      ? "bg-gray-300 text-gray-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {followedCreators[creator?.id] ? "Following" : "Follow"}
                </button>
              </div>
              <h1 className="text-gray-700 text-lg md:text-2xl font-bold">
                {title}
              </h1>
              <p className="text-gray-500 text-sm md:text-base">
                {description}
              </p>

              <div className="flex items-center justify-center md:justify-start space-x-14 lg:space-x-44 md:space-x-28  mt-4">
                <BsPersonCircle
                  onClick={() => handleClick(index)}
                  className="text-3xl md:text-3xl sm:text-2xl cursor-pointer text-gray-500 hover:text-gray-700 w-10"
                />

                <Link to={link}>
                  <Button description={"View"} />
                </Link>

                <BiSolidLike
                  onClick={() => handleLike(index)}
                  className={`text-3xl md:text-3xl cursor-pointer ${
                    likedCards[index] ? "text-blue-500" : "text-gray-500"
                  } hover:text-blue-500`}
                />
              </div>

              <LikeShow />
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default CategoryCard;
