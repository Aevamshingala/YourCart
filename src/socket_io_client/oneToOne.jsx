import { React, useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import { persondata } from "../components/personData.js";
import owal from ".././components/assets/owal.png";
import { useLocation, useNavigate } from "react-router-dom";

const socket = io?.connect("http://localhost:3000");
function OneMessage() {
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);
  const [join, setJoin] = useState("");
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [followedCreators, setFollowedCreators] = useState({});

  const { userId } = location.state;
  const id = persondata.name;
  socket.emit("mymessage", id);

  const joinroom = () => {};
  const leaveRoom = () => {
    setChat("");
    setJoin("");
    navigate("/profile");
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [message, setChat, chat]);
  const handleChat = () => {
    console.log("hello");
  };
  const creator = {
    name: "aevam",
  };
  const handleFollow = (creatorId) => {
    setFollowedCreators((prev) => ({
      ...prev,
      [creatorId]: !prev[creatorId],
    }));
  };
  return (
    <>
      <div className="h-screen bg-transparent flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-3xl p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <img
                  src={creator?.image || owal}
                  alt={creator?.name || "Unknown"}
                  className="w-12 h-12 rounded-full object-cover border border-gray-300 mr-3"
                />
                <p className="text-lg font-semibold text-gray-700">
                  {creator?.name || "Unknown"}
                </p>
              </div>
              <button
                onClick={() => handleFollow(creator?.id)}
                className={`px-4 py-1 text-sm font-medium rounded-full transition-all ${
                  followedCreators[creator?.id]
                    ? "bg-gray-300 text-gray-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {followedCreators[creator?.id] ? "Following" : "Follow"}
              </button>
            </div>
            {/* <div className="flex justify-end mt-3">
              <button
                type="button"
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition-all"
                onClick={leaveRoom}
              >
                Leave
              </button>
            </div> */}
          </div>

          {/* Chat Window */}
          <div
            className="flex-1 p-4 bg-gray-50 rounded-xl shadow-inner space-y-4 overflow-y-scroll h-fit max-h-80 scrollbar-thin"
            ref={chatContainerRef}
          >
            {chat.map(({ content, user, timeStamp }, index) => {
              const time = new Date(timeStamp).toLocaleTimeString("en-IN", {
                minute: "2-digit",
                hour: "2-digit",
                timeZone: "Asia/Kolkata",
                hour12: true,
              });

              return (
                <div
                  key={index}
                  className={`flex ${
                    user === "aevam" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg shadow-md break-words ${
                      user === "aevam"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-base leading-relaxed">{content}</p>
                    <p className="text-xs mt-1 text-right opacity-70">{user}</p>
                    <p className="text-xs mt-1 text-right opacity-70">{time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center space-x-3 border-t pt-4">
            <input
              type="text"
              name="chat"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
            />
            <button
              type="submit"
              onClick={handleChat}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default OneMessage;
