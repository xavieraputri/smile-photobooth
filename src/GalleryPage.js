import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "./PhoneFrame";
import "./StartPage.css";

export default function GalleryPage({ setPhoto }) {
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState(false);
  const fileInputRef = useRef();
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
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const finish = () => {
    setPhoto(preview);
    navigate("/final");
  };

  return (
    <PhoneFrame>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "url('/assets/WhiteCrumpled.png') center center/cover no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
          paddingTop: "2.5vh"
        }}
      >
        {/* Gallery image preview area */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#222', borderRadius: '32px', padding: '0rem 0rem', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', marginBottom: '0', width: '90%', height: '66.66%', maxWidth: '100%', maxHeight: '100%', justifyContent: 'center' }}>
          {preview ? (
            <img src={preview} alt="preview" width="320" height="540" style={{ width: '100%', height: '100%', borderRadius: '24px', objectFit: 'cover', background: '#000', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', borderRadius: '24px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '1.2rem' }}>
              No image selected
            </div>
          )}
        </div>
        {/* Choose/Retake button below image */}
        <div style={{ width: '70%', display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
          {!selected ? (
            <>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFile}
                style={{ display: 'none' }}
              />
              <button className="startpage-btn" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                Choose
              </button>
            </>
          ) : (
            <button className="startpage-btn" onClick={retakePhoto}>Retake Photo</button>
          )}
        </div>
        {/* Absolute positioned bottom buttons */}
        <button
          className="startpage-btn"
          style={{ position: 'absolute', left: '2.5%', bottom: '2.5%', width: '28%', minWidth: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
          onClick={() => navigate("/main")}
        >
          Back
        </button>
        <button
          className="startpage-btn"
          style={{ position: 'absolute', right: '2.5%', bottom: '2.5%', width: '28%', minWidth: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
          onClick={finish}
          disabled={!selected}
        >
          Finish
        </button>
      </div>
    </PhoneFrame>
  );
}