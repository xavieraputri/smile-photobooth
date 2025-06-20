import React from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "./PhoneFrame";
import "./StartPage.css";
import { playClickSound } from "./App";

export default function MainPage() {
  const navigate = useNavigate();
  
  const handleCameraClick = () => {
    playClickSound();
    navigate("/camera");
  };
  
  const handleGalleryClick = () => {
    playClickSound();
    navigate("/gallery");
  };
  
  return (
    <PhoneFrame>
      {/* <h2 className="startpage-title">Choose an option</h2> */}
      <div className="startpage-buttons-vertical">
        <button className="startpage-btn" onClick={handleCameraClick}>Camera</button>
        <button className="startpage-btn" onClick={handleGalleryClick}>Gallery</button>
      </div>
    </PhoneFrame>
  );
}