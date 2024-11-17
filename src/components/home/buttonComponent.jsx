import React from "react";
import { motion } from "framer-motion";

export function Button() {
  return (
    <>
      <motion.div
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          className="bg-blue-500 bg-opacity-80 hover:bg-opacity-100 text-white
          font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out
          transform hover:scale-105 focus:ring-2 focus:ring-blue-500
          focus:ring-opacity-50 mt-5"
        >
          get Link
        </button>
      </motion.div>
    </>
  );
}
