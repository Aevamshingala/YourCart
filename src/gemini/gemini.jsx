import React, { useState } from "react";
import axios from "axios";

function Gemini() {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");

  async function generateGemini() {
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBFrwZKYb7_sLc2EurcAGJ8EoaKaIzDvkw",
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });
      setQuestion("");
      setMessage(
        response.data.candidates[0]?.content?.parts[0]?.text || "No response"
      );
    } catch (error) {
      setMessage("Error generating response. Please try again.");
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission
      generateGemini(); // Trigger the generate function
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br bg-transparent text-white p-6">
      {/* Top Input Box */}
      <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Gemini AI Generator
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={() => setMessage("")}
            placeholder="Enter your question..."
            className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            onClick={generateGemini}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Generate Response
          </button>
        </div>
      </div>

      {/* Response Container */}
      {message && (
        <>
          <h2 className="text-xl font-semibold mb-2 mt-4">Response:</h2>
          <pre className="text-white p-4 font-sans rounded-lg overflow-auto">
            {message}
          </pre>
        </>
      )}
    </div>
  );
}

export default Gemini;
