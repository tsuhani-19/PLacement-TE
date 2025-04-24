import React from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import ResumeState from './Context/ResumeState';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';


function App() {
  return (
    <ResumeState>
      <div className="App">
        <Helmet>
          <title>Slrtce</title>
        </Helmet>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
        
        </Routes>
      </div>
    </ResumeState>
  );
}

export default App;