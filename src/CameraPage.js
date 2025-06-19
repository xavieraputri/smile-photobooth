import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CameraPage({ setPhoto }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [captured, setCaptured] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCamera() {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(s);
      videoRef.current.srcObject = s;
    }
    getCamera();
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  const takePhoto = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 320, 540);
    setCaptured(true);
  };

  const retakePhoto = () => {
    setCaptured(false);
  };

  const finish = () => {
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setPhoto(dataUrl);
    navigate("/final");
  };

  return (
    <div className="mainpage-container" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f7f7f7' }}>
      <h2 className="mainpage-title">Camera</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#222', borderRadius: '32px', padding: '2rem 1rem', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', marginBottom: '2rem', width: '340px', maxWidth: '90vw' }}>
        <video ref={videoRef} width="320" height="540" autoPlay style={{ borderRadius: '24px', background: '#000', objectFit: 'cover', marginBottom: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', display: captured ? 'none' : 'block' }} />
        <canvas ref={canvasRef} width="320" height="540" style={{ display: captured ? "block" : "none", borderRadius: '24px', marginBottom: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }} />
      </div>
      <div className="mainpage-buttons" style={{ flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center', display: 'flex' }}>
        <button className="mainpage-btn" style={{ width: '220px' }} onClick={() => navigate("/main")}>Back</button>
        {!captured ? (
          <button className="mainpage-btn" style={{ width: '220px' }} onClick={takePhoto}>Take Photo</button>
        ) : (
          <button className="mainpage-btn" style={{ width: '220px' }} onClick={retakePhoto}>Retake Photo</button>
        )}
        <button className="mainpage-btn" style={{ width: '220px' }} onClick={finish} disabled={!captured}>Finish</button>
      </div>
    </div>
  );
}