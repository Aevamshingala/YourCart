import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import cardData from "../temoData";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const navigate = useNavigate();
  const [searchval, setsearchval] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handlesearch = (title) => {
    console.log(title);

    navigate(`/searchpost/${title}`);
  };
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
          type="search"
          placeholder="What are you looking for?"
          className="bg-gray-700 text-white pl-8 pr-6 py-2 rounded-lg w-full 
          border focus:border-gray-400 focus:bg-gray-600"
          value={searchval}
          onChange={(e) => setsearchval(e.target.value)}
        />
        {searchval && (
          <div className="absolute left-0 top-full mt-2 w-full bg-gray-800 text-white rounded-lg shadow-lg p-4 z-10 h-40 scrollbar-thin-none overflow-y-scroll ">
            <ul>
              {filteredData.length > 0 ? (
                filteredData.map(({ title }) => (
                  <li
                    key={nanoid()}
                    className="h-5 bg-gray-400 rounded-md m-2 flex items-center justify-center"
                    onClick={() => handlesearch(title)}
                  >
                    {title}
                  </li>
                ))
              ) : (
                <li>No results found</li>
              )}
            </ul>
          </div> // hrear not link inseted of _id
        )}
      </div>
    </div>
  );
}
