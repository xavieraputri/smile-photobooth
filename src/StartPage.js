import React from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();
  return (
    <div className="mainpage-container">
      <h1 className="mainpage-title">Smile Photobooth</h1>
      <div className="mainpage-buttons">
        <button className="mainpage-btn" onClick={() => navigate("/main")}>Start</button>
      </div>
    </div>
  );
}