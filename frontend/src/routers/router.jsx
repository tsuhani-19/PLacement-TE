import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import React from 'react';
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../pages/home/Profile"; 
import Year1ComputerPage from "../components/year1computer";
import ResumeBuilding from "../pages/Resume";
import HigherStudies from "../pages/higher/HigherStudies.jsx";
import Gate from "../pages/higher/Gate.jsx";
import Placement from "../pages/Placement.jsx";
import AptitudeTest from "../pages/SampleGuide/Aptitude.jsx";
import GDRound from "../pages/SampleGuide/GDround.jsx";
import TechnicalRound from "../pages/SampleGuide/Technical.jsx";
import Interview from "../pages/SampleGuide/Interveiw.jsx";
import Entrepreneur from "../pages/Entrepreneur.jsx";
import CatExam from "../pages/higher/CatExam.jsx";
import Ies from "../pages/higher/IES.jsx";
import Isro from "../pages/higher/IsroExam.jsx";
import Barc from "../pages/higher/BarcExam.jsx";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
   
      {
        path: "/year1computer",
        element: <Year1ComputerPage />,
      },
      {
        path: "/Resume",
        element: <ResumeBuilding />,
      },
      {
        path: "/HigherStudies",
        element: <HigherStudies />,
      },
      {
        path: "/HigherStudies/gate",
        element: <Gate />,
      },
      {
        path:"/HigherStudies/CatExam",
        element:<CatExam/>,
      },
      {
        path:"/Entrepreneur",
        element:<Entrepreneur/>,
      },
      {
        path:"/HigherStudies/IES",
        element:<Ies/>,
      },
      {
        path:"/HigherStudies/Isro",
        element: <Isro/>,
      },
      {
        path:"/HigherStudies/BARC",
        element: <Barc/>,

      },
     
      {
        path: "/placement",
        element: <Placement />,
      },
      {
        path: "/placement/aptitude-test",
        element: <AptitudeTest />,
      },
      {
        path: "/placement/technical-round",
        element: <TechnicalRound />,
      },
      {
        path: "/placement/gd-round",
        element: <GDRound />,
      },
      {
        path: "/placement/interview",
        element: <Interview />,
      },
      {
        path: "*",
        element: <h2>404 - Page Not Found</h2>,
      },
    ],
  },
]);

export default router;
