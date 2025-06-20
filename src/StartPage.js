import React from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "./PhoneFrame";
import "./StartPage.css";
import { playClickSound } from "./App";

export default function StartPage() {
  const navigate = useNavigate();
  
  const handleStartClick = () => {
    playClickSound();
    navigate("/main");
  };
  
  return (
    <PhoneFrame>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '2rem',
        marginTop: '-14rem',
        marginBottom: '-5rem'
      }}>
        <img 
          src="/assets/Title.png" 
          alt="Title" 
          className="title-float"
          style={{ 
            maxWidth: '95%', 
            height: 'auto',
            marginBottom: '0rem'
          }} 
        />
        <img 
          src="/assets/xaviera.png" 
          alt="by xaviera" 
          style={{ 
            maxWidth: '40%', 
            height: 'auto',
            marginBottom: '-0.5rem',
            marginTop: '-0.5rem',
          }} 
        />
        <button className="startpage-btn" onClick={handleStartClick}>Start</button>
      </div>
    </PhoneFrame>
  );
}