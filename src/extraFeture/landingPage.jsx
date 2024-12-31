import React, { useEffect, useState } from "react";
import eye from "../components/assets/eye_two.jpeg";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  // const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let delay = setTimeout(() => {
      // setShow(true);
      navigate("/home");
    }, 3000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="relative h-[100vh] w-full overflow-hidden bg-black  ">
      {/* Fullscreen Image with Animation */}
      <img
        src={eye}
        alt="eye"
        className="absolute inset-0 h-screen w-screen object-cover scale-105 rounded-lg shadow-2xl animate-fadeIn"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
        {/* {show && ( */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-wider animate-fadeIn">
          Welcome to My Landing Page
        </h1>
        {/* )} */}
        <p className="mt-4 text-lg md:text-2xl text-gray-300">
          Discover something amazing.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
