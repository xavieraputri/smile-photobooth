import React from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "./PhoneFrame";
import "./StartPage.css";
import { playClickSound } from "./App";

export default function FinalPage({ photo }) {
  const navigate = useNavigate();

  const savePhoto = () => {
    playClickSound();
    const a = document.createElement("a");
    a.href = photo;
    a.download = "photobooth.png";
    a.click();
  };

  const sharePhoto = async () => {
    playClickSound();
    if (navigator.share) {
      try {
        const res = await fetch(photo);
        const blob = await res.blob();
        const file = new File([blob], "photobooth.png", { type: "image/png" });
        await navigator.share({
          files: [file],
          title: "My Photobooth Pic",
          text: "Check out my photo!",
        });
      } catch (err) {
        // Suppress cancellation errors (browser differences)
        if (
          err.name !== "AbortError" &&
          err.message !== "Abort due to cancellation of share." &&
          err.message !== "The request is aborted." &&
          err.message !== "Share canceled"
        ) {
          alert("Sharing failed: " + err.message);
        }
        // Otherwise, do nothing (user just cancelled)
      }
    } else {
      alert("Web Share API not supported on this device.");
    }
  };

  const handleRestartClick = () => {
    playClickSound();
    navigate("/");
  };

  const handleBackClick = () => {
    playClickSound();
    navigate("/gallery");
  };

  return (
    <PhoneFrame>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "url('/assets/WhiteCrumpled.png') center center/cover no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
          paddingTop: "2.5vh"
        }}
      >
        {/* Final photo preview area */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          background: '#222', 
          borderRadius: '32px', 
          padding: '0rem 0rem', 
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)', 
          marginBottom: '0', 
          width: '90%', 
          height: '66.66%', 
          maxWidth: '100%', 
          maxHeight: '100%', 
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {photo && (
            <img
              src={photo}
              alt="final"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                objectFit: 'contain',
                background: '#000',
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                userSelect: 'none',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            />
          )}
        </div>
        
        {/* Restart button below image */}
        <div style={{ width: '70%', display: 'flex', justifyContent: 'center', marginBottom: '1.0rem', marginTop: '-1.0rem', gap: '1rem' }}>
          <button 
            className="startpage-btn" 
            onClick={handleRestartClick}
            style={{
              fontSize: '1.4rem',
              padding: '0.7em 2em',
              minHeight: '25px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Restart
          </button>
          <button 
            className="startpage-btn" 
            onClick={() => {}} // Empty function for coming soon
            style={{
              fontSize: '1.4rem',
              padding: '0.7em 2em',
              minHeight: '25px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'visible'
            }}
          >
            Decorate
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              background: '#ff6b6b',
              color: 'white',
              fontSize: '0.7rem',
              padding: '2px 6px',
              borderRadius: '8px',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              SOON
            </span>
          </button>
        </div>
        
        {/* Absolute positioned bottom buttons */}
        <button
          className="startpage-btn"
          style={{ 
            position: 'absolute', 
            left: '10%', 
            bottom: '2.5%', 
            width: '20%', 
            minWidth: 80, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center',
            fontSize: '1.3rem',
            padding: '0.6em 1.5em',
            minHeight: '25px'
          }}
          onClick={handleBackClick}
        >
          Back
        </button>
        <button
          className="startpage-btn"
          style={{ 
            position: 'absolute', 
            left: '38%', 
            bottom: '2.5%', 
            width: '20%', 
            minWidth: 90, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center',
            fontSize: '1.3rem',
            padding: '0.6em 1.5em',
            minHeight: '25px'
          }}
          onClick={savePhoto}
        >
          Save
        </button>
        <button
          className="startpage-btn"
          style={{ 
            position: 'absolute', 
            right: '7%', 
            bottom: '2.5%', 
            width: '20%', 
            minWidth: 90, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center',
            fontSize: '1.3rem',
            padding: '0.6em 1.5em',
            minHeight: '25px'
          }}
          onClick={sharePhoto}
        >
          Share
        </button>
      </div>
    </PhoneFrame>
  );
}