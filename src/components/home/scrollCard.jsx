import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import cardData from "../temoData.js";
import { Button } from "./buttonComponent.jsx";
import { BiSolidLike } from "react-icons/bi";
import { persondata } from "../personData.js";
import { BsPersonCircle } from "react-icons/bs";

const scrollCard = () => {
  const [islike, setIsLike] = useState(false);
  const [isShow, setIsShow] = useState(null);

  const handleClick = (i) => {
    setIsShow(isShow === i ? null : i);
  };

  return (
    <div className="flex overflow-x-scroll overflow-y-visible space-x-4 p-6 scroll-smooth scrollbar-thin z-0">
      {cardData.map(({ title, imageUrl, description, link }, index) => (
        <div
          key={nanoid()}
          className={`min-w-[300px] sm:min-w-[400px] md:min-w-[600px] lg:min-w-[800px]
         bg-white border border-gray-200 rounded-lg shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl focus-within:ring-4 focus-within:ring-blue-400 overflow-visible ${
           isShow === index ? "z-20" : "h-full"
         }`}
        >
          {/* Image */}
          <img
            className="w-full h-48 md:h-64 object-cover"
            src={imageUrl}
            alt={title}
          />

          <div className="p-6 ">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              {title}
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-xl mb-4">{description}</p>

            {/* Button */}
            <div className="flex items-center justify-center space-x-4">
              <BsPersonCircle
                onClick={() => handleClick(index)}
                className="text-3xl hover:cursor-pointer mt-4 text-gray-500"
              />
              <Link to={link}>
                <Button description={"get Link"} />
              </Link>

              <BiSolidLike
                className={`text-3xl  ${
                  islike ? "text-blue-500" : "text-gray-500"
                } cursor-pointer hover:text-blue-500 mt-4`}
                // take the id of post and check the like
              />
            </div>

            {isShow === index && (
              <div className="absolute left-0 top-full mt-2 w-full bg-gray-800 text-white rounded-lg shadow-lg p-4 z-50 h-40  overflow-y-scroll scrollbar-thin ">
                <ul>
                  {persondata.length > 0 ? (
                    persondata.map(({ image, name }) => (
                      <div
                        key={nanoid()}
                        className="flex items-start p-4 border border-gray-600 rounded-md hover:bg-gray-900"
                      >
                        <img
                          src={image}
                          alt={name}
                          className="w-16 h-16 rounded-full object-cover mr-6"
                        />
                        <div className="flex-grow mt-4 ">
                          <div className="text-white font-semibold text-lg">
                            {name}
                          </div>{" "}
                        </div>
                        <div className="-mt-2">
                          <Button description={"follow"} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <li>No results found</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default scrollCard;

