import React from "react";
import { persondata } from "../personData";
import { Button } from "../home/buttonComponent";
import { nanoid } from "nanoid";

function Show_follow() {
  return (
    <div className="bg-transparent h-screen p-6">
      <div className="max-w-4xl mx-auto shadow-lg rounded-md overflow-hidden w-full">
        <div className="flex flex-col gap-y-4 bg-transparent">
          {persondata.map(({ name, image, description }) => (
            <div
              key={nanoid()}
              className="flex items-start p-4 border border-gray-600 rounded-md hover:bg-gray-900"
            >
              <img
                src={image}
                alt={name}
                className="w-16 h-16 rounded-full object-cover mr-6"
              />
              <div className="flex-grow">
                <div className="text-white font-semibold text-lg">{name}</div>
                <div className="text-gray-400 text-sm">
                  Remix & React Training
                </div>
                <div className="text-gray-300 mt-2">{description}</div>
              </div>
              <Button description={"follow"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Show_follow;
