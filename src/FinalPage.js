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

  return (
    <PhoneFrame>
      <h2 className="startpage-title">Your Photo</h2>
      {photo && (
        <img
          src={photo}
          alt="final"
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '60vh',
            height: 'auto',
            width: 'auto',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            objectFit: 'contain'
          }}
        />
      )}
      <div className="startpage-buttons-vertical">
        <button 
          className="startpage-btn" 
          onClick={savePhoto}
          style={{
            fontSize: '1.5rem',
            padding: '0.7em 2em',
            minHeight: '25px'
          }}
        >
          Save
        </button>
        <button 
          className="startpage-btn" 
          onClick={sharePhoto}
          style={{
            fontSize: '1.5rem',
            padding: '0.7em 2em',
            minHeight: '25px'
          }}
        >
          Share
        </button>
        <button 
          className="startpage-btn" 
          onClick={handleRestartClick}
          style={{
            fontSize: '1.5rem',
            padding: '0.7em 2em',
            minHeight: '25px'
          }}
        >
          Restart
        </button>
      </div>
    </PhoneFrame>
  );
}