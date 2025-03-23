import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { Button } from "./buttonComponent.jsx";
import { BiSolidLike } from "react-icons/bi";
import LikeShow from "../likeShow.jsx";

const ScrollCard = ({ cardData }) => {
  const [isliked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isliked);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {cardData.map(({ title, imageUrl, description, link }, index) => (
        <div
          key={nanoid()}
          className="bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl focus-within:ring-4 focus-within:ring-blue-400"
        >
          {/* Image */}
          <img
            className="w-full h-48 md:h-64 object-cover rounded-t-lg"
            src={imageUrl}
            alt={title}
          />

          {/* Card Content */}
          <div className="p-6">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              {title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-4">{description}</p>

            {/* Button and Like Section */}
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">

                <LikeShow />
                <Link to={link}>
                  <Button description={"View"} />
                </Link>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <BiSolidLike
                  className={`text-3xl ${
                    islike ? "text-blue-500" : "text-gray-500"
                  } cursor-pointer hover:text-blue-500`}
                  onClick={handleLike}
                />
                <span className="text-sm text-gray-500">Like</span>{" "}
               
              </div>
            </div>  */}
            <div className="flex items-center justify-between">
              <Link to={link}>
                <Button description={"Visit"} />
              </Link>
              <BiSolidLike
                className={`text-2xl cursor-pointer transition-all`}
                onClick={() => handleLike(index)}
              />
            </div>

            <LikeShow />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollCard;
