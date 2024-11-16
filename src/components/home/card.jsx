import React from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import cardData from "../temoData.js";
import { Button } from "./buttonComponent.jsx";

function Card() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {cardData
        .slice(0, 20)
        .map(({ title, imageUrl, description, link }, index) => {
          // Set specific spans for each card by index to control the layout
          const spanClass = [
            "lg:col-span-1 lg:row-span-1",
            "lg:col-span-2 lg:row-span-1",
            "lg:col-span-1 lg:row-span-1",
            "lg:col-span-3 lg:row-span-1",
            "lg:col-span-1 lg:row-span-1",
            "lg:col-span-1 lg:row-span-1",
            "lg:col-span-2 lg:row-span-1",
            "lg:col-span-1 lg:row-span-1",
            "lg:col-span-1 lg:row-span-1",
            "lg:col-span-3 lg:row-span-1",
          ][index % 10];
          // it take value from the index and then assing to spanclass
          return (
            <div
              key={nanoid()}
              className={`bg-white bg-opacity-90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl focus-within:ring-4 focus-within:ring-blue-400 ${spanClass}`}
            >
              {/* Image */}
              <img
                className="w-full h-48 md:h-64 lg:h-72 object-cover"
                src={imageUrl}
                alt={title}
              />

              <div className="p-6">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {title}
                </h2>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4">{description}</p>

                {/* Button */}
                <div className="flex justify-center">
                  <Link to={link}>
                    <Button />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Card;
