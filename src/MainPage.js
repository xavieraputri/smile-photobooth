import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Choose an option</h2>
      <button onClick={() => navigate("/camera")}>Camera</button>
      <button onClick={() => navigate("/gallery")}>Gallery</button>
    </div>
  );
}