import "./App.css";
import Navbar from "./components/navbar/navbar.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function App() {
  const isVerified = useSelector((state) => state?.auth?.isVerified);
  const isd = useSelector((state) => state?.auth?.isVerified);
  console.log(isd);

  return isVerified ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

