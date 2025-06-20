import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "./PhoneFrame";
import "./StartPage.css";
import { playClickSound } from "./App";

export default function CameraPage({ setPhoto }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [captured, setCaptured] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            aspectRatio: 9/16,
            width: { ideal: 1080, min: 720 },
            height: { ideal: 1920, min: 1280 }
          }
        });
        setStream(s);
        videoRef.current.srcObject = s;
      } catch (err) {
        setPermissionDenied(true);
      }
    }
    getCamera();
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
    // eslint-disable-next-line
  }, []);

  const takePhoto = () => {
    playClickSound();
    const video = videoRef.current;
    const canvas = canvasRef.current;
    // Use the container's pixel size
    const container = video.parentElement;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const containerAspect = containerWidth / containerHeight;
    const videoAspect = video.videoWidth / video.videoHeight;
    let sx, sy, sWidth, sHeight;
    if (videoAspect > containerAspect) {
      // Video is wider than container: crop sides
      sHeight = video.videoHeight;
      sWidth = Math.floor(sHeight * containerAspect);
      sx = Math.floor((video.videoWidth - sWidth) / 2);
      sy = 0;
    } else {
      // Video is taller than container: crop top/bottom
      sWidth = video.videoWidth;
      sHeight = Math.floor(sWidth / containerAspect);
      sx = 0;
      sy = Math.floor((video.videoHeight - sHeight) / 2);
    }
    // Set canvas pixel size to match the container
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, containerWidth, containerHeight);
    setCaptured(true);
  };

  const retakePhoto = () => {
    playClickSound();
    setCaptured(false);
  };

  const finish = () => {
    playClickSound();
    const canvas = canvasRef.current;
    // The canvas already has the video stream's native resolution
    const dataUrl = canvas.toDataURL("image/png");
    setPhoto(dataUrl);
    navigate("/final");
  };

  const handleBackClick = () => {
    playClickSound();
    navigate("/main");
  };

  return (
    // Camera Screen
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
        {/* <h2 className="startpage-title">Camera</h2> */}
        {permissionDenied ? (
          <div style={{ color: "#b00", textAlign: "center", margin: "2em 0" }}>
            Camera access was denied.<br />
            Please allow camera access to use this feature.
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#222', borderRadius: '32px', padding: '0rem', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', marginBottom: '0', width: '90%', height: '66.66%', maxWidth: '100%', maxHeight: '100%', justifyContent: 'center' }}>
              <video ref={videoRef} width="400" height="600" autoPlay style={{ width: '100%', height: '100%', borderRadius: '24px', background: '#000', objectFit: 'cover', marginBottom: '0rem', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', display: captured ? 'none' : 'block' }} />
              <canvas ref={canvasRef} style={{ 
                width: '100%', 
                height: '100%', 
                display: captured ? "block" : "none", 
                borderRadius: '24px', 
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)', 
                background: '#000'
              }} />
            </div>
            <div style={{ width: '70%', display: 'flex', justifyContent: 'center', marginBottom: '0.2rem' }}>
              {!captured ? (
                <button 
                  className="startpage-btn" 
                  onClick={takePhoto}
                  style={{
                    fontSize: '1.3rem',
                    padding: '0.6em 1.8em',
                    minHeight: '25px'
                  }}
                >
                  Take Photo
                </button>
              ) : (
                <button 
                  className="startpage-btn" 
                  onClick={retakePhoto}
                  style={{
                    fontSize: '1.3rem',
                    padding: '0.6em 1.8em',
                    minHeight: '25px'
                  }}
                >
                  Retake Photo
                </button>
              )}
            </div>
            {/* Absolute positioned bottom buttons */}
            <button
              className="startpage-btn"
              style={{ 
                position: 'absolute', 
                left: '8%', 
                bottom: '2.5%', 
                width: '22%', 
                minWidth: 90, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                textAlign: 'center',
                fontSize: '1.3rem',
                padding: '0.6em 1.8em',
                minHeight: '25px'
              }}
              onClick={handleBackClick}
            >
              Back
            </button>
            <button
              className="startpage-btn"
              style={{ 
                position: 'absolute', 
                right: '8%', 
                bottom: '2.5%', 
                width: '22%', 
                minWidth: 90, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                textAlign: 'center',
                fontSize: '1.3rem',
                padding: '0.6em 1.8em',
                minHeight: '25px'
              }}
              onClick={finish}
              disabled={!captured}
            >
              Finish
            </button>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}