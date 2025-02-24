import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import React from 'react';
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../pages/home/Profile"; 
import Year2ElectronicsPage from "../components/year2electronics";
import Year1ComputerPage from "../components/year1computer";


  


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <div>about page</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard/profile",  // Add this route
        element: <Profile />,
      },
      {
        path:"/year2electronics" ,
        element:<Year2ElectronicsPage /> 
      },{
        path:"/year1computer",
        element:<Year1ComputerPage />
      }
    ],
  },
]);

export default router;
