import { CircleStencil, Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const CropeImage = () => {
  const [isimg, setIsImg] = useState();
  const [cropperSourse, setCropperSourse] = useState();
  const [isUploade, setIsUpload] = useState(false);
  const [canvas, setcanvas] = useState();
  const location = useLocation();
  useEffect(() => {
    const { cropUrl, isUpload } = location.state || {};
    setCropperSourse(cropUrl);
    setIsUpload(isUpload);
    console.log(cropperSourse);
  }, [location]);

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
  return (
    <div className="flex items-center justify-center w-full h-screen p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className="bg-transparent shadow-lg rounded-xl p-6 flex flex-col items-center">
          {/* Cropper */}
          {isUploade && (
            <div className="w-full h-[300px] border-2 border-gray-300 overflow-hidden mt-4">
              <Cropper
                onChange={cropper}
                src={cropperSourse}
                stencilComponent={CircleStencil}
                className="w-full h-full"
              />
            </div>
          )}
        </div>

        {/* Preview & Save Button */}
        {isimg && (
          <div className="bg-transparent shadow-lg rounded-xl p-6 flex flex-col items-center">
            <div className="flex flex-col items-center gap-4">
              <img
                src={isimg}
                alt="Cropped"
                className="rounded-full w-40 h-40 border-4 border-orange-500 shadow-md t"
              />
              <button
                className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition-all"
                onClick={Filesave}
              >
                Save Image
              </button>
            </div>
          </div>
        )}
      </div>
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
