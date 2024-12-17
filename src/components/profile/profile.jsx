import { motion } from "framer-motion";
import React from "react";
import { Button } from "../home/buttonComponent";

const Profile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="min-h-screen flex bg-white mt-8 ">
        {/* Sidebar */}
        <div className="w-1/6 bg-[#121212] text-white flex items-center justify-center py-10 px-5">
          <div className="text-7xl font-semibold transform -rotate-90 whitespace-nowrap bg-profile ">
            Hello, Aevam
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 grid grid-cols-2">
          {/* Left Side - Image */}
          <div className="flex items-center justify-center p-5">
            <img
              src="https://imgs.search.brave.com/FYmsuChFcB46GmHEP9uO7qHz1b2vSK1YhJWr8s8m7sM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzE4LzA0LzYz/LzM2MF9GXzcxODA0/NjM2NF9rWGtTWGJG/dVZHeHNBNXVxZFlj/S0Q5SllIMlVrTjVi/Ui5qcGc"
              alt="Profile"
              className="object-cover w-4/4 rounded-lg ml-10 "
            />
          </div>

          {/* Right Side - Text */}
          <div className="flex flex-col justify-center px-10">
            <h1 className="text-5xl font-bold leading-tight mb-4">Our Story</h1>
            <p className="text-gray-600 mb-4">
              Read the story of four girls who have carved out their space in
              the world.
            </p>

            {/* Button Container */}
            <div className="flex space-x-4 mb-4 items-center justify-center">
              <Button description={"Follow"} />
              <Button description={"Follower"} />
            </div>

            <a
              href="#"
              className="font-semibold text-black uppercase hover:underline"
            >
              Read The Full Story
            </a>
          </div>
        </div>

        {/* Right Social Media Sidebar */}
        <div className="w-12 bg-white flex flex-col justify-center items-center space-y-10">
          <div className="text-xs transform -rotate-90">Facebook</div>
          <div className="text-xs transform -rotate-90">Instagram</div>
          <div className="text-xs transform -rotate-90">Twitter</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
