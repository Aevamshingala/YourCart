import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import eye from "../assets/eye.jpeg";
import clsx from "clsx"; // Import clsx for dynamic classes
import io from "socket.io-client";
import profiles from "./profileData.js";

const socket = io?.connect("http://localhost:3000");

const allowedColors = [
  "bg-orange-500",
  "bg-gray-500",
  "bg-green-500",
  "bg-sky-500",
  "bg-lime-500",
  "bg-rose-500",
  "bg-red-500",
  "bg-zinc-500",
  "bg-blue-500",
  "bg-cyan-500",
  "bg-teal-500",
  "bg-pink-500",
  "bg-slate-500",
  "bg-stone-500",
  "bg-purple-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-fuchsia-500",
  "bg-indigo-500",
  "bg-yellow-500",
];

function NatureProfileCard() {
  const navigate = useNavigate();

  const connectToUser = (id) => {
    socket.emit("joinMeToUser", id);
    navigate("/personalmessage", { state: { userId: id } });
  };
  return profiles.map(
    (
      {
        name,
        followers,
        following,
        // description,
        location,
        image,
      },
      index
    ) => {
      const coverClass =
        allowedColors[index % allowedColors.length] ||
        "bg-gray-500 border-gray-600";
      return (
        <div className="flex items-center justify-center min-h-screen p-6 -mb-8  ">
          <div className="bg-white shadow-xl rounded-2xl p-6 max-w-sm w-full text-center relative border border-gray-200 overflow-y-hidden">
            {/* Cover Image */}
            <div
              className={clsx("w-full h-24 rounded-t-2xl", coverClass)}
            ></div>

            {/* Profile Image */}
            <div className="relative w-24 h-24 mx-auto -mt-12 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={image || eye}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Details */}
            <h2 className="mt-4 text-xl font-bold text-gray-800">{name}</h2>
            {/* <p className="text-gray-500">{description}</p> */}

            {/* Location */}
            <div className="flex items-center justify-center mt-2 text-gray-600">
              <FaMapMarkerAlt className="text-gray-600" />
              <span className="ml-2">{location}</span>
            </div>

            {/* Stats */}
            <div className="flex justify-around mt-4 text-gray-700">
              <div className="text-center">
                <p className="text-lg font-semibold">{followers || 0}</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">{following || 0}</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
              <div className="text-center mt-2">
                <FaUsers className="text-gray-600 text-2xl" />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex">
              <button
                className={clsx(
                  "px-6 py-2 text-white rounded-full shadow-md transition",
                  coverClass || "bg-gray-500 border-gray-600",
                  "hover:brightness-90"
                )}
              >
                Follow
              </button>
              <button
                className={clsx(
                  "ml-4 px-6 py-2 rounded-full shadow-md transition border",
                  `border-gray-500 text-black hover:text-white`
                )}
                onMouseOver={(e) =>
                  e.target.classList.add(coverClass || "bg-gray-500")
                }
                onMouseLeave={(e) =>
                  e.target.classList.remove(coverClass || "bg-gray-500")
                }
                onClick={() => connectToUser(index)}
              >
                Message
              </button>
            </div>
          </div>
        </div>
      );
    }
  );
}

export default NatureProfileCard;
