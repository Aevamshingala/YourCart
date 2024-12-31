import React, { useState } from "react";
import cardData from "../temoData";
import { nanoid } from "nanoid";
import { Button } from "../home/buttonComponent";
import { motion } from "framer-motion";
import Category from "../home/category";
import { Link } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { persondata } from "../personData";
import { BsPersonCircle } from "react-icons/bs";

function CategoryCard() {
  const [islike, setIsLike] = useState(false);
  const [isShow, setIsShow] = useState(null);

  const handleClick = (i) => {
    setIsShow(isShow === i ? null : i);
  };
  return (
    <div className=" w-full grid grid-cols-1 p-6 gap-6">
      <Category />
      {cardData.map(({ title, imageUrl, description, link }, index) => (
        <div
          className="bg-white bg-opacity-95 rounded-2xl h-[300px] lg:h-full md:h-full flex justify-center items-center"
          key={nanoid()}
        >
          <div className=" hover:scale-110 transition-all">
            <img
              src={imageUrl}
              alt={title}
              className=" lg:w-[80%] lg:h-[80%] p-6 rounded-full sm:w-full sm:h-full"
            />
          </div>

          <div className="bg-white rounded-2xl h-[50%] p-5 sm:h-fit md:h-fit m-5 hover:ring-8 ring-blue-200 relative ">
            <h1 className=" text-gray-700 text-2xl ">{title}</h1>
            <h2 className="text-gray-400 text-xl ">{description}</h2>

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
              <div className="absolute left-0 top-full mt-2 w-full bg-gray-800 text-white rounded-lg shadow-lg p-4 z-10 h-40  overflow-y-scroll scrollbar-thin ">
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
}

export default CategoryCard;
