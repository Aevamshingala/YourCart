import { useState, useEffect } from "react";
import Message from "../Message.jsx";
import valid from "webvalid";
import { CropeImage } from "../cropper/cropper.jsx";
import { apiData } from "../backend_connection/api_handler.js";
import { Link, useNavigate } from "react-router-dom";
function RegisterForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploadMode, setUploadMode] = useState("upload");
  const [file, setFile] = useState("");
  const navigate = useNavigate("");
  const mydata = (event) => {
    setFile(event.target.files[0]);
    console.log(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userName ||
      !email ||
      !password ||
      !fullName ||
      !gender ||
      !description ||
      !location ||
      !file
    ) {
      setError("All fields are required.");
      return;
    }
    if (!valid.validEmail(email)) {
      setError("please fill email correctly");
      return;
    }
    if (!valid.validFullName(fullName)) {
      setError("please fill fullName correctly");
      return;
    }
    if (!password.length === 6) {
      setError("password must be 6 digit");
      return;
    }
    if (!isNaN(userName) || !isNaN(fullName) || !isNaN(location)) {
      setError(`don't use numbers in name or location`);
      return;
    }
    if (!/^[A-Za-z\s]+,\s*[A-Za-z\s]+$/.test(location)) {
      setError(`please fill location correctly`);
      return;
    }
    if (!/^\S+$/.test(userName)) {
      setError(`space is not allow between name`);
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("fullName", fullName);
    formData.append("userName", userName);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("discription", description);
    formData.append("Location", location);

    await apiData({
      url: "/register",
      data: formData,
    })
      .then((res) => {
        if (res.success) {
          setMessage(res.message);
          const timer = setTimeout(() => {
            navigate("/login");
          }, 2000);
          clearTimeout(timer);
        } else {
          setError(res.error);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };
  useEffect(() => {
    const clear = setTimeout(() => {
      setError("");
      setMessage("");
    }, 6000);
    return () => {
      clearTimeout(clear);
    };
  }, [error, message]);
  return (
    <div className="flex justify-center items-center">
      {error && (
        <Message
          title={error && "Problem"}
          message={error}
          titleColor="#ffffff"
          messageColor="#f0f0f0"
          customStyles={{ top: "10%", right: "10%" }}
        />
      )}
      {message && (
        <Message
          title={message && "Success"}
          message={message}
          titleColor="#ffffff"
          messageColor="#f0f0f0"
          customStyles={{
            top: "10%",
            right: "10%",
          }}
        />
      )}
      {uploadMode === "upload" && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 shadow-2xl rounded-lg p-8 w-96 border border-gray-700"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Register an Account
          </h2>

          {/* Username Input */}
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value.trim())}
            placeholder="Username"
            className="w-full mt-2 py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 font-medium focus:border-blue-400 focus:ring focus:ring-blue-500 focus:outline-none placeholder-gray-400"
          />

          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mt-2 py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 font-medium focus:border-blue-400 focus:ring focus:ring-blue-500 focus:outline-none placeholder-gray-400"
          />

          {/* Password Input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mt-2 py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 font-medium focus:border-blue-400 focus:ring focus:ring-blue-500 focus:outline-none placeholder-gray-400"
            min={6}
          />

          {/* Full Name Input */}
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full mt-2 py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 font-medium focus:border-blue-400 focus:ring focus:ring-blue-500 focus:outline-none placeholder-gray-400"
          />

          {/* Gender Select */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full mt-2 py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 font-medium focus:border-blue-400 focus:ring focus:ring-blue-500 focus:outline-none placeholder-gray-400"
          >
            <option value="" className="text-gray-400" disabled>
              Select Gender
            </option>
            <option value="male" className="text-gray-100">
              Male
            </option>
            <option value="female" className="text-gray-100">
              Female
            </option>
            <option value="other" className="text-gray-100">
              Other
            </option>
          </select>

          {/* Location Input */}
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location (e.g., New York, America)"
            className="w-full mt-2 py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 font-medium focus:border-blue-400 focus:ring focus:ring-blue-500 focus:outline-none placeholder-gray-400"
          />

          {/* Description Textarea */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Bio"
            className="w-full mt-2 py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 font-medium focus:border-blue-400 focus:ring focus:ring-blue-500 focus:outline-none placeholder-gray-400"
          ></textarea>

          {/* Upload Mode Radio Buttons */}
          <div className="mt-2 flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="uploadMode"
                value="upload"
                checked={uploadMode === "upload"}
                onChange={() => setUploadMode("upload")}
                className="text-blue-400 focus:ring-blue-500"
              />
              <span className="text-gray-300">Upload Image</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="uploadMode"
                value="edit"
                checked={uploadMode === "edit"}
                onChange={() => setUploadMode("edit")}
                className="text-blue-400 focus:ring-blue-500"
              />
              <span className="text-gray-300">Edit Image</span>
            </label>
          </div>

          {/* File Input */}
          <input
            type="file"
            className="block w-full text-sm text-gray-300
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-600 file:text-white
          hover:file:bg-blue-700 mt-1 px-3 py-2 cursor-pointer bg-gray-700 rounded-lg"
            onChange={mydata}
            accept="image/*"
          />

          {/* Submit Button */}
          <input
            type="submit"
            value="Register"
            className="w-full mt-6 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
          />
          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

          {/* Messages */}
          <div className="w-full">
            {message && (
              <div className="mt-2 p-2 bg-green-900 text-green-300 rounded w-full">
                {message}
              </div>
            )}
            {error && (
              <div className="mt-2 p-2 bg-red-900 text-red-300 rounded w-full">
                {error}
              </div>
            )}
          </div>
        </form>
      )}
      {uploadMode === "edit" && (
        <div className="flex flex-col items-center justify-center gap-6 p-6 bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-800">
          {/* Back Button */}
          <button
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out relative overflow-hidden group"
            onClick={() => setUploadMode("upload")}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </span>
            <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-0 transition-all duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
          </button>

          {/* CropeImage Component */}
          <div className="w-full max-w-2xl">
            <CropeImage />
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
