import React from "react";
import { persondata } from "./personData";
import { nanoid } from "nanoid";
import { FcLike } from "react-icons/fc";
function LikeShow() {
  return (
    <div className="left-0 top-full mt-2 w-full p-4 z-10">
      <div className="flex flex-wrap gap-4">
        {persondata.length > 0 ? (
          persondata.map(({ image, name }) => (
            <div
              key={nanoid()}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                // Add your click handler logic here
                console.log(`Clicked on ${name}'s profile`);
              }}
            >
              <img
                src={image}
                alt={name}
                className="w-10 h-10 rounded-full object-cover mb-2"
              />
              <FcLike className="absolute mt-7 ml-5" />
              <span className="text-sm text-gray-700">{name}</span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-700">No results found</div>
        )}
      </div>
    </div>
  );
}

export default LikeShow;
