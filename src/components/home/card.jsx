import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import cardData from "../temoData.js";
import { Button } from "./buttonComponent.jsx";
import { BiSolidLike } from "react-icons/bi";
import { persondata } from "../personData.js";
import { BsPersonCircle } from "react-icons/bs";

function Card() {
  const [islike, setIsLike] = useState(false);
  const [isShow, setIsShow] = useState(null);

  const handleClick = (i) => {
    setIsShow(isShow === i ? null : i);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 ">
      {cardData
        .slice(0, 20)
        .map(({ title, imageUrl, description, link }, index) => {
          // Set specific spans for each card by index to control the layout
          const spanClass = [
            "lg:col-span-1 ",
            "lg:col-span-2 ",
            "lg:col-span-1 ",
            "lg:col-span-3 ",
            "lg:col-span-1 ",
            "lg:col-span-1 ",
            "lg:col-span-2 ",
            "lg:col-span-1 ",
            "lg:col-span-1 ",
            "lg:col-span-3 ",
          ][index % 10];
          // it take value from the index and then assing to spanclass
          return (
            <div
              key={nanoid()}
              className={`relative bg-white border border-gray-200 rounded-lg shadow-lg overflow-visible transition transform hover:-translate-y-2 hover:shadow-2xl lg:row-span-1 ${spanClass} ${
                isShow === index ? "z-10" : "h-full"
              }`}
            >
              {/* Image */}
              <div>
                <img
                  className="w-full h-48 md:h-64 lg:h-72 object-cover"
                  src={imageUrl}
                  alt={title}
                />
              </div>
              <div className="rounded-2xl h-[50%] p-5 sm:h-fit md:h-fit m-5 hover:ring-8 ring-blue-200  ">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-700 mb-2 ">
                  {title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 mb-4 text-xl">{description}</p>

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
              </div>
              {isShow === index && (
                <>
                  <div className="absolute left-0 top-full mt-2 w-full bg-gray-800 text-white rounded-lg shadow-lg p-4 z-10 h-32  overflow-y-scroll scrollbar-thin ">
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
                            <div className="flex-grow mt-4 -ml-2 mr-2 ">
                              <div className="text-white font-semibold text-lg">
                                {name}
                              </div>{" "}
                            </div>
                            <div className="-mt-2 ">
                              <Button description={"follow"} />
                            </div>
                          </div>
                        ))
                      ) : (
                        <li>No results found</li>
                      )}
                    </ul>
                  </div>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default Card;


