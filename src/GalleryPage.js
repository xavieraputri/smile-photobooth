import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GalleryPage({ setPhoto }) {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const finish = () => {
    setPhoto(preview);
    navigate("/final");
  };

  return (
    <div>
      <h2>Gallery</h2>
      <input type="file" accept="image/*" onChange={handleFile} />
      {preview && <img src={preview} alt="preview" width="400" />}
      <div>
        <button onClick={() => navigate("/main")}>Back</button>
        <button onClick={finish} disabled={!preview}>Finish</button>
      </div>
    </div>
  );
}