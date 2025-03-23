import { CircleStencil, Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const CropeImage = () => {
  const [isimg, setIsImg] = useState();
  const [cropperSourse, setCropperSourse] = useState();
  const [isUpload, setIsUpload] = useState(false);
  const [canvas, setcanvas] = useState();
  const navigate = useNavigate();
  const cropper = (event) => {
    setcanvas(event?.getCanvas());
    // console.log(event);
    if (canvas) {
      const img = canvas.toDataURL("image/png");
      // console.log(img);
      setIsImg(img);
    }
  };

  const Filesave = async () => {
    if (isimg) {
      //todo : pass the data base methos and update the avatar by giveing the cropperSourse
      const link = document.createElement("a");
      link.href = isimg;
      link.download = "cropped-image.png";
      link.click();
    }
  };

  const [error, setError] = useState(null);

  const mydata = (event) => {
    console.log(event.target.files);
    const myimgfile = event.target.files[0];
    const typeOfFile = event.target.files[0].name.split(".")[1];
    const typeList = ["png", "jpeg", "jpg"];
    if (!typeList.some((List) => List == typeOfFile)) {
      // console.log(typeOfFile);
      setError("invalid file type");
    } else {
      const url = URL.createObjectURL(myimgfile);
      setCropperSourse(url);
      setIsUpload(true);
    }
  };
  navigator;

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-6 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* File Input Section */}
        <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 flex flex-col items-center transform transition-all hover:scale-105 border-2 border-gray-700 hover:border-purple-500">
          <input
            type="file"
            className={`block w-full text-sm text-gray-300
              file:mr-4 file:py-3 file:px-6
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-gradient-to-r file:from-purple-600 file:to-blue-600 file:text-white
              hover:file:from-purple-700 hover:file:to-blue-700
              transition-all duration-300 ease-in-out
              mt-1 px-3 py-2 cursor-pointer bg-transparent`}
            onChange={mydata}
            accept="image/*"
          />
          {!isUpload && (
            <p className="mt-4 text-gray-400 text-sm">
              Upload an image to get started.
            </p>
          )}
        </div>

        {/* Cropper Section */}
        <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 flex flex-col items-center transform transition-all hover:scale-105 border-2 border-gray-700 hover:border-blue-500">
          {isUpload && (
            <div className="w-full h-[300px] border-2 border-dashed border-gray-600 rounded-lg overflow-hidden mt-4 relative">
              <Cropper
                onChange={cropper}
                src={cropperSourse}
                stencilComponent={CircleStencil}
                className="w-full h-full"
              />
            </div>
          )}
        </div>

        {/* Preview & Save Button Section */}
        {isimg && (
          <div className="col-span-full bg-gray-800 shadow-2xl rounded-2xl p-8 flex flex-col items-center transform transition-all hover:scale-105 border-2 border-gray-700 hover:border-orange-500">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <img
                  src={isimg}
                  alt="Cropped"
                  className="rounded-full w-48 h-48 border-4 border-purple-500 shadow-lg transform transition-all hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-orange-500 transition-all duration-300"></div>
              </div>
              <button
                className="px-8 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:from-orange-700 hover:to-pink-700 transition-all duration-300 ease-in-out relative overflow-hidden group"
                onClick={Filesave}
              >
                <span className="relative z-10">Save Image</span>
                <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-0 transition-all duration-300"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-4 text-center text-red-400 font-semibold animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
};

//  learning from gpt

//       const link = document.createElement("a");
//       link.href = isimg;
//       link.download = "cropped-image.png";
//       link.click();
//       console.log(isimg);
// <button
//   className="mt-4 px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition"
//   onClick={Filesave}
// >
//   Download Cropped Image
// </button>;

// const Filesave = () => {
//   if (isimg) {
//     fetch(isimg)
//       .then((res) => res.blob()) // Convert Base64 to Blob
//       .then((blob) => {
//         const url = URL.createObjectURL(blob); // Create a downloadable URL
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = "cropped-image.png";
//         document.body.appendChild(link); // Append link to body
//         link.click(); // Trigger download
//         document.body.removeChild(link); // Remove the link after download
//         URL.revokeObjectURL(url); // Free memory
//       })
//       .catch((err) => console.error("Error downloading image:", err));
//   }
// };

// canvas.toBlob((Blob) => {
//   // console.log(Blob);
//   const file = new File([Blob], "myavatar.png", {
//     type: "image/png",
//   });
//   console.log(file); /// it give the file like proparties
// }, "image/png");
