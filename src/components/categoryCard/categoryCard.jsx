import React, { useState } from "react";
import cardData from "../temoData";
import { nanoid } from "nanoid";
import { Button } from "../home/buttonComponent";
import { motion } from "framer-motion";
import Category from "../home/category";
import { Link } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";

function CategoryCard() {
  const [islike, setIsLike] = useState(false);

  return (
    <div className=" w-full grid grid-cols-1 p-6 gap-6">
      <Category />
      {cardData.map(({ title, imageUrl, description, link }) => (
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

          <motion.div
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.6 }}
          >
            <div className="bg-white rounded-2xl h-[50%] p-5 sm:h-fit md:h-fit m-5 hover:ring-8 ring-blue-200">
              <h1 className=" text-gray-700 text-2xl ">{title}</h1>
              <h2 className="text-gray-400 text-xl ">{description}</h2>
              <div className="flex items-center justify-center space-x-4">
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
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default CategoryCard;
