import React from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "./PhoneFrame";
import "./StartPage.css";

export default function StartPage() {
  const navigate = useNavigate();
  return (
    <PhoneFrame>
      <h1 className="startpage-title">Smile</h1>
      <h2 className="startpage-subtitle">Photobooth</h2>
      <img src="/assets/CameraFilm.png" alt="film" className="startpage-film" />
      <button className="startpage-btn" onClick={() => navigate("/main")}>Start</button>
    </PhoneFrame>
  );
}