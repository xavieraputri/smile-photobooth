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
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '-2rem',
        marginTop: '-6rem'
      }}>
        <img 
          src="/assets/Title.png" 
          alt="Title" 
          style={{ 
            maxWidth: '95%', 
            height: 'auto',
            marginBottom: '0.5rem'
          }} 
        />
        <div className="startpage-buttons-vertical">
          <button 
            className="startpage-btn" 
            onClick={handleCameraClick}
            style={{
              fontSize: '1.5rem',
              padding: '0.7em 2em',
              minHeight: '25px'
            }}
          >
            Camera
          </button>
          <button 
            className="startpage-btn" 
            onClick={handleGalleryClick}
            style={{
              fontSize: '1.5rem',
              padding: '0.7em 2em',
              minHeight: '25px'
            }}
          >
            Gallery
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}