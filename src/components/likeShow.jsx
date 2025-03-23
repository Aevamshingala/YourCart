import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import { nanoid } from "nanoid";
import { persondata } from "../components/personData.js";

const PersonList = () => {
  const [showAll, setShowAll] = useState(false);

  // Function to toggle showing all items
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="left-0 top-full mt-2 w-full p-4 z-10">
      <div className="flex flex-nowrap gap-4 overflow-x-auto scrollbar-thin">
        {persondata.length > 0 ? (
          persondata
            .slice(0, showAll ? persondata.length : 3) // Show only 3 items initially
            .map(({ image, name }) => (
              <div
                key={nanoid()}
                className="flex flex-col items-center cursor-pointer flex-shrink-0 relative" // Add `relative` here
                onClick={() => {
                  console.log(`Clicked on ${name}'s profile`);
                }}
              >
                {/* Image Container */}
                <div className="relative">
                  {" "}
                  {/* Add a relative container for the image and like icon */}
                  <img
                    src={image}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover mb-2"
                  />
                  {/* Like Icon */}
                  <FcLike className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4" />{" "}
                  {/* Adjust positioning */}
                </div>
                {/* Name */}
                <span className="text-sm text-gray-700">{name}</span>
              </div>
            ))
        ) : (
          <div className="text-center text-gray-700">No results found</div>
        )}
      </div>

      {/* Show "See More" button if there are more than 3 items */}
      {persondata.length > 3 && (
        <button
          onClick={toggleShowAll}
          className="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          {showAll ? "Show Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default PersonList;
