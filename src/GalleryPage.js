import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "./PhoneFrame";
import "./StartPage.css";

export default function GalleryPage({ setPhoto }) {
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target.result);
        setSelected(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const retakePhoto = () => {
    setPreview(null);
    setSelected(false);
  };

  const finish = () => {
    setPhoto(preview);
    navigate("/final");
  };

  return (
    <PhoneFrame>
      <h2 className="startpage-title">Gallery</h2>
      {!selected && (
        <input type="file" accept="image/*" onChange={handleFile} style={{ marginBottom: '1.5rem' }} />
      )}
      {preview && <img src={preview} alt="preview" width="320" height="540" style={{ borderRadius: '24px', marginBottom: '1.5rem', objectFit: 'cover', background: '#000', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }} />}
      <div className="startpage-buttons-vertical">
        <button className="startpage-btn" onClick={() => navigate("/main")}>Back</button>
        {selected ? (
          <button className="startpage-btn" onClick={retakePhoto}>Retake Photo</button>
        ) : null}
        <button className="startpage-btn" onClick={finish} disabled={!selected}>Finish</button>
      </div>
    </PhoneFrame>
  );
}