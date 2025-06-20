import React from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "./PhoneFrame";
import "./StartPage.css";

export default function StartPage() {
  const navigate = useNavigate();
  return (
    <PhoneFrame>
      <button className="startpage-btn" onClick={() => navigate("/main")}>Start</button>
    </PhoneFrame>
  );
}