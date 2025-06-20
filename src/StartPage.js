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
      <button className="startpage-btn" onClick={handleStartClick}>Start</button>
    </PhoneFrame>
  );
}