import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Map from "./Map";
import Home from "./Home";
import Profile from "./Profile";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
