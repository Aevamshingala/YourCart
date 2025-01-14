import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function Client() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isjoin, setIsjoin] = useState(false);
  const [chat, setChat] = useState([]);
  const [join, setJoin] = useState("");

  const handleChat = (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      setError("Please fill in the message name.");
      return; // Exit if the input is empty
    }
    if (message.trim()) {
      socket.emit("newChat", {
        room: join,
        // user: {},
        content: message,
      });
      setMessage("");
    }
  };
  const chatContainerRef = useRef(null);
  const joinroom = (e) => {
    e.preventDefault();

    if (join.trim() === "") {
      setError("Please fill in the room name.");
      return; // Exit if the input is empty
    }

    setError(""); // Clear error if input is valid
    socket.emit("joinRoom", join, (response) => {
      if (response?.success) {
        console.log(`Joined room: ${join}`);
        setIsjoin(true);
      } else {
        console.error(
          "Failed to join room:",
          response?.message || "Unknown error"
        );
        setError(response?.message || "Failed to join the room.");
      }
    });
  };

  const leaveRoom = () => {
    setChat([]);
    setJoin("");
    setIsjoin(false);
  };

  const socketJoinevent = (payload) => {
    setIsjoin(payload);
    console.log(payload);
  };
  const socketpreviousMessage = (payload) => {
    setChat(payload);
  };

  socket.on("joinRoom", socketJoinevent);
  socket.on("previousMessage", socketpreviousMessage);

  useEffect(() => {
    const handleNewChat = (payload) => {
      setChat((prevChat) => [...prevChat, payload]);
      console.log(payload);
    };
    socket.on("newChat", handleNewChat);

    return () => {
      socket.off("newChat", handleNewChat);
    };
  }, [setChat, socket]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [message, setChat, chat]);

  return (
    <div className="h-screen bg-transparent flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-3xl p-6 space-y-6">
        {/* Chat Room Join Form */}
        {!isjoin ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Join a Chat Room
            </h2>
            <form onSubmit={joinroom} className="flex items-center space-x-2">
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
                value={join}
                onChange={(e) => setJoin(e.target.value)}
                placeholder="Enter room name"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-all"
              >
                Join
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex justify-center">
              <h2 className="font-bold text-3xl text-gray-500 w-fit">{join}</h2>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition-all"
                onClick={leaveRoom}
              >
                Leave Room
              </button>
            </div>
          </div>
        )}

        {/* Chat Window */}
        <div
          className="flex-1 p-4 bg-gray-50 rounded-xl shadow-inner space-y-4 overflow-y-scroll h-fit max-h-80 scrollbar-thin"
          ref={chatContainerRef}
        >
          {chat.map(({ content, user }, index) => (
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
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        {isjoin && (
          <form
            onSubmit={handleChat}
            className="flex items-center space-x-3 border-t pt-4"
          >
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
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-all"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );

}

export default Client;
