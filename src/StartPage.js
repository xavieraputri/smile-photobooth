import React from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "./PhoneFrame";
import "./StartPage.css";
import { playClickSound } from "./App";

export default function StartPage({ isBGMOn, toggleBGM }) {
  const navigate = useNavigate();
  
  const handleStartClick = () => {
    playClickSound();
    navigate("/main");
  };
  
  return (
    <PhoneFrame>
      {/* Volume Toggle Button */}
      <button
        onClick={toggleBGM}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          background: 'rgba(66, 107, 70, 0.8)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      >
        {isBGMOn ? (
          <span style={{ color: 'white', fontSize: '1.2rem' }}>🔊</span>
        ) : (
          <span style={{ color: 'white', fontSize: '1.2rem' }}>🔇</span>
        )}
      </button>
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