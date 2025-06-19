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
      const res = await fetch(photo);
      const blob = await res.blob();
      const file = new File([blob], "photobooth.png", { type: "image/png" });
      navigator.share({
        files: [file],
        title: "My Photobooth Pic",
        text: "Check out my photo!",
      });
    } else {
      alert("Web Share API not supported on this device.");
    }
  };

  return (
    <div>
      <h2>Your Photo</h2>
      {photo && <img src={photo} alt="final" width="400" />}
      <div>
        <button onClick={savePhoto}>Save</button>
        <button onClick={sharePhoto}>Share</button>
        <button onClick={() => navigate("/")}>Restart</button>
      </div>
    </div>
  );
}