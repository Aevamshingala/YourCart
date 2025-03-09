import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Fileuplod() {
  const navigate = useNavigate();
  const [cropUrl, setCropUrl] = useState(null);
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
      setCropUrl(url);
      // navigate("/image");
      navigate("/image", { state: { cropUrl: url, isUpload: true } });
    }
  };

  return (
    <>
      <input
        type="file"
        className={`block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-sky-50 file:text-sky-700
                hover:file:bg-sky-100 mt-1 px-3 py-2 cursor-pointer`}
        onChange={mydata}
        accept="image/*"
      />
      {error && <p>{error}</p>}
    </>
  );
}

export default Fileuplod;
