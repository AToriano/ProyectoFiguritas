import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./errorPage";
import Home from "./Components/Home/Home.jsx";
import RegisterEmail from "./Components/RegisterEmail/RegisterEmail.jsx";
import RegisterUser from "./Components/RegisterEmail/RegisterUser/RegisterUser.jsx";
import LogIn from "./Components/LogIn/LogIn.jsx";
import Coleccion from "./Components/Coleccion/Coleccion.jsx";
import NuevaPartida from "./Components/NuevaPartida/NuevaPartida.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/register",
    element: <RegisterEmail />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/register/user",
    element: <RegisterUser />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LogIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/nueva",
    element: <NuevaPartida />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/coleccion",
    element: <Coleccion />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
