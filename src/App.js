import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import StartPage from "./StartPage";
import MainPage from "./MainPage";
import CameraPage from "./CameraPage";
import GalleryPage from "./GalleryPage";
import FinalPage from "./FinalPage";
import AppBackground from "./AppBackground";
import './App.css';

// Click sound utility
const playClickSound = () => {
  try {
    // Create audio context for click sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Sharp TICK sound: higher frequency, square wave
    oscillator.frequency.setValueAtTime(2000, audioContext.currentTime);
    oscillator.type = 'square';
    
    // Sharp attack and very fast decay for TICK sound
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.0005);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.02);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.02);
  } catch (error) {
    // Fallback: silent failure if audio context is not supported
    console.log('Audio not supported');
  }
};

// Export the click sound function
export { playClickSound };

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