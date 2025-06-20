import React, { useState, useEffect, useRef } from "react";
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
  const [isBGMOn, setIsBGMOn] = useState(true);
  const bgmRef = useRef(null);

  useEffect(() => {
    // Initialize BGM audio
    bgmRef.current = new Audio('/assets/Persona.mp3');
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.3;
    
    // Start BGM if enabled
    if (isBGMOn) {
      bgmRef.current.play().catch(e => console.log('BGM autoplay blocked:', e));
    }
    
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (bgmRef.current) {
      if (isBGMOn) {
        bgmRef.current.play().catch(e => console.log('BGM play failed:', e));
      } else {
        bgmRef.current.pause();
      }
    }
  }, [isBGMOn]);

  const toggleBGM = () => {
    playClickSound();
    setIsBGMOn(!isBGMOn);
  };

  return (
    <>
      <AppBackground />
      <Router>
        <Routes>
          <Route path="/" element={<StartPage isBGMOn={isBGMOn} toggleBGM={toggleBGM} />} />
          <Route path="/main" element={<MainPage isBGMOn={isBGMOn} toggleBGM={toggleBGM} />} />
          <Route path="/camera" element={<CameraPage setPhoto={setPhoto} isBGMOn={isBGMOn} toggleBGM={toggleBGM} />} />
          <Route path="/gallery" element={<GalleryPage setPhoto={setPhoto} isBGMOn={isBGMOn} toggleBGM={toggleBGM} />} />
          <Route path="/final" element={<FinalPage photo={photo} isBGMOn={isBGMOn} toggleBGM={toggleBGM} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;