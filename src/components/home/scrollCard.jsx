import React from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import cardData from "../temoData.js";
import { Button } from "./buttonComponent.jsx";

const scrollCard = () => {
  return (
    // Scrollable horizontal container with horizontal padding and overflow-x-scroll
    <div className="flex overflow-x-scroll space-x-4 p-6 scroll-smooth scrollbar-thin">
      {cardData.map(({ title, imageUrl, description, link }) => (
        <div
          key={nanoid()}
          className="min-w-[300px] sm:min-w-[400px] md:min-w-[600px] lg:min-w-[800px]
 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl focus-within:ring-4 focus-within:ring-blue-400"
        >
          {/* Image */}
          <img
            className="w-full h-48 md:h-64 object-cover"
            src={imageUrl}
            alt={title}
          />

          <div className="p-6">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              {title}
            </h2>

            {/* Description */}
            <p className="text-gray-400  text-xl mb-4">{description}</p>

            {/* Button */}
            <div className="flex justify-center">
              <Link to={link}>
                <Button />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default scrollCard;
