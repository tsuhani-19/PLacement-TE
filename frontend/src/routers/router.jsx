import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import React from 'react';
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../pages/home/Profile"; 
import Year2ElectronicsPage from "../components/year2electronics";
import Year1ComputerPage from "../components/year1computer";
import Resume from "../pages/Resume";
import HigherStudies from "../pages/higher/HigherStudies";
import Gate from "../pages/higher/Gate";
import Placement from "../pages/home/Placement";
import Aptitude from "../pages/SampleGuide/Aptitude";
import GDround from "../pages/SampleGuide/GDround";
import Technical from "../pages/SampleGuide/Technical";
import Interview from "../pages/SampleGuide/Interveiw";



  


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
      },{
        path:"/Resume",
        element:<Resume />
      },{
        path:"/HigherStudies",
        element:<HigherStudies/>
      },{
        path:"/Gate",
        element:<Gate/>
      },{
        path:"/Placement",
        element:<Placement/>
      },{
        path:"/Aptitude",
        element:<Aptitude/>
      },{
        path:"/GDround",
        element:<GDround/>
      },{
        path:"/Interview",
        element:<Interview/>
      },
      {
        path:"/Technical",
        element:<Technical/>
      }
    ],
  },
]);

export default router;
