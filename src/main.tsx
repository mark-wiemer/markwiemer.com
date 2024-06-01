import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/root/Home.tsx";
import About from "./routes/about/About.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";
import Breakout from "./routes/games/breakout/Breakout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/games/breakout",
    element: <Breakout />,
    errorElement: <ErrorPage />,
  },
]);

// `root` is guaranteed by `index.html` (if it's not there, we have bigger issues!)
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
