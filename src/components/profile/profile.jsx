import React from "react";

const Profile = () => {
  return (
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
            src="https://via.placeholder.com/400"
            alt="Profile"
            className="object-cover w-3/4 rounded-lg "
          />
        </div>

        {/* Right Side - Text */}
        <div className="flex flex-col justify-center px-10">
          <span className="text-gray-500 uppercase text-sm mb-2">
            Editorial
          </span>
          <h1 className="text-5xl font-bold leading-tight mb-4">Our Story</h1>
          <p className="text-gray-600 mb-4">
            Read the story of four girls who have carved out their space in the
            world.
          </p>
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
  );
};

export default Profile;
