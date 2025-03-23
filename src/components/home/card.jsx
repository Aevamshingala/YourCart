import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { Button } from "./buttonComponent.jsx";
import { BiSolidLike } from "react-icons/bi";
import owal from "../assets/owal.png";
import LikeShow from "../likeShow.jsx";

function Card({ cardData }) {
  const [likedCards, setLikedCards] = useState({});
  const [isliked, setIsLiked] = useState(false);
  const [followedCreators, setFollowedCreators] = useState({});
  const navigate = useNavigate();
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 relative">
      {cardData.map(
        ({ title, imageUrl, description, link, creator }, index) => (
          <div
            key={nanoid()}
            className="relative bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition transform hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Card Image */}
            <img
              className="w-full h-56 object-cover"
              src={imageUrl}
              alt={title}
            />

            {/* Card Content */}
            <div className="p-5">
              {/* Creator Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <img
                    src={creator?.avatar || owal}
                    alt={creator?.userName || "Unknown"}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300 mr-3 cursor-pointer"
                    onClick={() => handleProfile(creator?.userName)}
                  />
                  <p className="text-lg font-semibold text-gray-700">
                    {creator?.userName || "Unknown"}
                  </p>
                </div>
                <button
                  onClick={() => handleFollow(creator?.id)}
                  className={`px-4 py-1 text-sm font-medium rounded-full transition-all ${
                    followedCreators[creator?.id]
                      ? "bg-gray-300 text-gray-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {followedCreators[creator?.id] ? "Following" : "Follow"}
                </button>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{description}</p>

              {/* Buttons */}
              <div className="flex items-center justify-between">
                <Link to={link}>
                  <Button description={"Visit"} />
                </Link>
                <BiSolidLike
                  className={`text-2xl cursor-pointer transition-all ${
                    likedCards[index]
                      ? "text-blue-500"
                      : "text-gray-400 hover:text-blue-500"
                  }`}
                  onClick={() => handleLike(index)}
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

export default Card;
