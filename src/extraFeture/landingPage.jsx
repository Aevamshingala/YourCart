import React, { useEffect, useState } from "react";
import moon from "../components/assets/moon.png";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import { useDispatch } from "react-redux";
import { Myuser } from "../authservices/authSlice.js";
import { apiData } from "../backend_connection/api_handler";
import { useSelector } from "react-redux";
import Message from "../Message.jsx";

function LandingPage() {
  const [username, setUsername] = useState("Explorer");
  const [isonline, setIsOnline] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.userData);

  window.addEventListener("offline", () => {
    setIsOnline(false);
  });

  const finduser = async () => {
    const response = await apiData({
      url: "/myprofile",
      data: {},
    });

    if (response?.data?.success) {
      dispatch(Myuser(response?.data?.data));
      setUsername(response?.data?.data.userName);
      const timer = setTimeout(() => {
        navigate("/home");
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  };
  useEffect(() => {
    if (user) {
      setUsername(user?.user?.userName);
      console.log(username, user?.userName);

      const timer = setTimeout(() => {
        navigate("/home");
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      finduser();
    }
  }, [username]);

  return (
    <div className="relative h-[100vh] w-full overflow-hidden bg-black">
      {!isonline && (
        <Message
          title="oops!! Net Work"
          message="You lost internet connection!"
          titleColor="#ffffff"
          messageColor="#f0f0f0"
          customStyles={{
            top: "10%",
            right: "10%",
          }}
        />
      )}

      <div className="absolute inset-0 bg-space bg-cover bg-center animate-pulse-slow"></div>

      {/* Glowing Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        {/* Welcome Message with Glow Animation */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-wider animate-glow">
          Welcome, {username}
        </h1>

        {/* Moon Image with Floating Animation */}
        <div className="my-8 animate-float">
          <img
            src={moon}
            alt="Listening Moon"
            className="w-48 h-48 md:w-72 md:h-72 rounded-full object-cover border-4 border-white/50 shadow-2xl"
          />
        </div>

        {/* Subtext with Typing Animation */}
        <p className="mt-4 text-xl md:text-3xl text-gray-300 font-light animate-typewriter">
          Embark on a journey through the cosmos...
        </p>

        {/* Interactive Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, index) => (
            <div
              key={index}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
