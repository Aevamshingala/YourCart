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
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/category" element={<CategoryCard />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
