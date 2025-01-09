import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function Client() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleChat = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chat", { message, user: "aevam" });
      setMessage("");
    }
  };
  const chatContainerRef = useRef(null);
  const socketevent = (payload) => {
    setChat((prevChat) => [...prevChat, payload]);
  };
  useEffect(() => {
    socket.on("chat", socketevent);
    return () => socket.off("chat", socketevent); // Cleanup listener
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [message]);

  return (
    <div className="h-screen bg-transparent min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white overflow-hidden shadow-md rounded-lg flex flex-col p-4 space-y-4">
        {/* Chat Window */}
        <div
          className="flex-1 overflow-y-auto space-y-2 scrollbar-thin shadow-teal-200 shadow-2xl"
          ref={chatContainerRef}
        >
          {chat.map(({ message, user }, index) => (
            <div
              key={index}
              className={`flex ${
                user === "aevam" ? "justify-end" : "justify-start"
              } m-8`}
            >
              <div
                className={`${
                  user === "aevam"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                } px-4 py-2 rounded-lg max-w-xs break-words`}
              >
                <p className="text-md">{message}</p>
                <p className="text-xs mt-1 text-right">{user}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <form
          onSubmit={handleChat}
          className="flex items-center space-x-2 border-t pt-2"
        >
          <input
            type="text"
            name="chat"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Client;
