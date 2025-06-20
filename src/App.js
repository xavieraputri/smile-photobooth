import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import StartPage from "./StartPage";
import MainPage from "./MainPage";
import CameraPage from "./CameraPage";
import GalleryPage from "./GalleryPage";
import FinalPage from "./FinalPage";
import AppBackground from "./AppBackground";
import './App.css';

function App() {
  const [photo, setPhoto] = useState(null);

  return (
    <>
      <AppBackground />
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/camera" element={<CameraPage setPhoto={setPhoto} />} />
          <Route path="/gallery" element={<GalleryPage setPhoto={setPhoto} />} />
          <Route path="/final" element={<FinalPage photo={photo} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;