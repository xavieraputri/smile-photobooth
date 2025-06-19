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
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
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
    ctx.drawImage(videoRef.current, 0, 0, 400, 300);
    setCaptured(true);
  };

  const finish = () => {
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setPhoto(dataUrl);
    navigate("/final");
  };

  return (
    <div>
      <h2>Camera</h2>
      <video ref={videoRef} width="400" height="300" autoPlay />
      <canvas ref={canvasRef} width="400" height="300" style={{ display: captured ? "block" : "none" }} />
      <div>
        <button onClick={() => navigate("/main")}>Back</button>
        <button onClick={takePhoto}>Take Photo</button>
        <button onClick={finish} disabled={!captured}>Finish</button>
      </div>
    </div>
  );
}