import React from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "./PhoneFrame";
import "./StartPage.css";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <PhoneFrame>
      {/* <h2 className="startpage-title">Choose an option</h2> */}
      <div className="startpage-buttons-vertical">
        <button className="startpage-btn" onClick={() => navigate("/camera")}>Camera</button>
        <button className="startpage-btn" onClick={() => navigate("/gallery")}>Gallery</button>
      </div>
    </PhoneFrame>
  );
}