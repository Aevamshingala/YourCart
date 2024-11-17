import React from "react";
import cardData from "../temoData";
import { nanoid } from "nanoid";

function CategoryCard() {
  return (
    <div className=" w-full grid grid-cols-1 p-6">
      {cardData.map(({ title, imageUrl, description, link }) => (
        <div
          className="bg-white m-4 rounded-md flex h-[300px] lg:h-full md:h-full"
          key={nanoid()}
        >
          <div className="w-[50%]">
            <img
              src={imageUrl}
              alt={title}
              className=" flex w-full h-[80%] p-4 rounded-full "
            />
          </div>
          <div className="flex justify-center bg-blue-800  w-[50%] h-fit mt-5 rounded-2xl">
            <h2 className="text-white text-xl ">{description}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryCard;
