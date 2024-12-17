import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import cardData from "../temoData";
import { nanoid } from "nanoid";

export default function Searchbar() {
  const [searchval, setsearchval] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = cardData.filter(({ title }) =>
      title.toLowerCase().includes(searchval.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchval]);

  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-full max-w-lg">
        <FiSearch className="absolute top-3 left-2 text-gray-400" />
        <input
          type="text"
          placeholder="What are you looking for?"
          className="bg-gray-700 text-white pl-8 pr-6 py-2 rounded-lg w-full 
          border focus:border-gray-400 focus:bg-gray-600"
          value={searchval}
          onChange={(e) => setsearchval(e.target.value)}
        />
        {searchval && (
          <div className="absolute left-0 top-full mt-2 w-full bg-gray-800 text-white rounded-lg shadow-lg p-4 z-10 h-40 scrollbar-hide overflow-scroll">
            <ul>
              {filteredData.length > 0 ? (
                filteredData.map(({ title }) => <li key={nanoid()}>{title}</li>)
              ) : (
                <li>No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
