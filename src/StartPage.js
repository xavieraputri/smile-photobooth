import React from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Smile Photobooth</h1>
      <button onClick={() => navigate("/main")}>Start</button>
    </div>
  );
}