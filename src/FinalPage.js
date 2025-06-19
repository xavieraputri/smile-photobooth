import React from "react";
import { useNavigate } from "react-router-dom";

export default function FinalPage({ photo }) {
  const navigate = useNavigate();

  const savePhoto = () => {
    const a = document.createElement("a");
    a.href = photo;
    a.download = "photobooth.png";
    a.click();
  };

  const sharePhoto = async () => {
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

  return (
    <div className="mainpage-container">
      <h2 className="mainpage-title">Your Photo</h2>
      {photo && <img src={photo} alt="final" width="400" style={{ borderRadius: '8px', marginBottom: '1.5rem' }} />}
      <div className="mainpage-buttons">
        <button className="mainpage-btn" onClick={savePhoto}>Save</button>
        <button className="mainpage-btn" onClick={sharePhoto}>Share</button>
        <button className="mainpage-btn" onClick={() => navigate("/")}>Restart</button>
      </div>
    </div>
  );
}