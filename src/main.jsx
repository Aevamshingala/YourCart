import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements, RouterProvider } from "react-router";
import { Route } from "react-router";
import Home from "./components/home/home.jsx";
import CategoryCard from "./components/categoryCard/categoryCard.jsx";
import Profile from "./components/profile/profile.jsx";
import Show_follow from "./components/profile/show_follow.jsx";
import LandingPage from "./extraFeture/landingPage.jsx";
import { Outlet } from "react-router";
import Gemini from "./gemini/gemini.jsx";
import Client from "./socket_io_client/client.jsx";
import { CropeImage } from "./cropper/cropper.jsx";
import OneMessage from "./socket_io_client/oneToOne.jsx";
import Fileuplod from "./cropper/file.jsx";

const LayoutWithoutNavbarAndFooter = () => (
  <div>
    <div className="content">
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<App />}>
        <Route path="home" element={<Home />} />
        <Route path="category" element={<CategoryCard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="showfollower" element={<Show_follow />} />
        <Route path="gemini" element={<Gemini />} />
        <Route path="chat" element={<Client />} />
        <Route path="image" element={<CropeImage />} />
        <Route path="personalmessage" element={<OneMessage />} />
        <Route path="upload" element={<Fileuplod />} />
      </Route>

      <Route element={<LayoutWithoutNavbarAndFooter />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
