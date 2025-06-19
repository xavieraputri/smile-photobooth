import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="mainpage-container">
      <h2 className="mainpage-title">Choose an option</h2>
      <div className="mainpage-buttons">
        <button className="mainpage-btn" onClick={() => navigate("/camera")}>Camera</button>
        <button className="mainpage-btn" onClick={() => navigate("/gallery")}>Gallery</button>
      </div>
    </div>
  );
}