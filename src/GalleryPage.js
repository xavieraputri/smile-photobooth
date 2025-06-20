import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "./PhoneFrame";
import "./StartPage.css";
import { playClickSound } from "./App";

export default function GalleryPage({ setPhoto }) {
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target.result);
        setSelected(true);
        setImagePosition({ x: 0, y: 0 });
        setImageScale(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    if (!selected) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selected) return;
    e.preventDefault();
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Get container bounds to limit dragging
    const container = imageRef.current?.parentElement;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const imageRect = imageRef.current?.getBoundingClientRect();
      
      if (imageRect) {
        const scaledWidth = imageRect.width * imageScale;
        const scaledHeight = imageRect.height * imageScale;
        
        // Calculate boundaries based on scaled image size
        const maxX = scaledWidth > containerRect.width ? scaledWidth - containerRect.width : 0;
        // Allow free vertical movement
        const maxY = 1000;
        
        setImagePosition({
          x: Math.max(-maxX, Math.min(0, newX)),
          y: Math.max(-maxY, Math.min(0, newY))
        });
      }
    }
  };

  const handleMouseUp = (e) => {
    if (e) e.preventDefault();
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    if (!selected) return;
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - imagePosition.x,
      y: touch.clientY - imagePosition.y
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !selected) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;
    
    // Get container bounds to limit dragging
    const container = imageRef.current?.parentElement;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const imageRect = imageRef.current?.getBoundingClientRect();
      
      if (imageRect) {
        const scaledWidth = imageRect.width * imageScale;
        const scaledHeight = imageRect.height * imageScale;
        
        // Calculate boundaries based on scaled image size
        const maxX = scaledWidth > containerRect.width ? scaledWidth - containerRect.width : 0;
        // Allow free vertical movement
        const maxY = 1000;
        
        setImagePosition({
          x: Math.max(-maxX, Math.min(0, newX)),
          y: Math.max(-maxY, Math.min(0, newY))
        });
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (e) e.preventDefault();
    setIsDragging(false);
  };

  const zoomIn = () => {
    playClickSound();
    if (imageScale < 3) {
      setImageScale(prev => Math.min(3, prev + 0.2));
    }
  };

  const zoomOut = () => {
    playClickSound();
    if (imageScale > 0.5) {
      setImageScale(prev => Math.max(0.5, prev - 0.2));
    }
  };

  const retakePhoto = () => {
    playClickSound();
    setPreview(null);
    setSelected(false);
    setImagePosition({ x: 0, y: 0 });
    setImageScale(1);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const finish = () => {
    playClickSound();
    if (!preview || !imageRef.current) return;
    
    // Create a canvas to crop the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const container = imageRef.current.parentElement;
      const containerRect = container.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();
      
      // Set canvas size to match the crop area
      canvas.width = containerRect.width;
      canvas.height = containerRect.height;
      
      // Calculate the crop area considering scale and position
      const scaleX = img.width / imageRect.width;
      const scaleY = img.height / imageRect.height;
      
      const cropX = (-imagePosition.x / imageScale) * scaleX;
      const cropY = (-imagePosition.y / imageScale) * scaleY;
      const cropWidth = (containerRect.width / imageScale) * scaleX;
      const cropHeight = (containerRect.height / imageScale) * scaleY;
      
      // Draw the cropped portion
      ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, canvas.width, canvas.height);
      
      const croppedDataUrl = canvas.toDataURL('image/png');
      setPhoto(croppedDataUrl);
      navigate("/final");
    };
    
    img.src = preview;
  };

  const handleChooseClick = () => {
    playClickSound();
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleBackClick = () => {
    playClickSound();
    navigate("/main");
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
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          background: '#222', 
          borderRadius: '32px', 
          padding: '0rem 0rem', 
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)', 
          marginBottom: '0', 
          width: '90%', 
          height: '66.66%', 
          maxWidth: '100%', 
          maxHeight: '100%', 
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {preview ? (
            <img 
              ref={imageRef}
              src={preview} 
              alt="preview" 
              style={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: '24px', 
                objectFit: 'contain', 
                background: '#000', 
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                cursor: selected ? (isDragging ? 'grabbing' : 'grab') : 'default',
                transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                userSelect: 'none'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', borderRadius: '24px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '1.2rem' }}>
              No image selected
            </div>
          )}
        </div>
        
        {/* Zoom controls */}
        {selected && (
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '0rem',
            marginTop: '1.0rem',
            alignItems: 'center'
          }}>
            <button 
              onClick={zoomOut}
              style={{
                background: '#426B46',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              -
            </button>
            <span style={{ color: '#426B46', fontSize: '0.9rem' }}>
              {Math.round(imageScale * 100)}%
            </span>
            <button 
              onClick={zoomIn}
              style={{
                background: '#426B46',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              +
            </button>
          </div>
        )}
        
        {/* Choose/Retake button below image */}
        <div style={{ width: '70%', display: 'flex', justifyContent: 'center', marginBottom: '1.0rem', marginTop: '-1.0rem' }}>
          {!selected ? (
            <>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFile}
                style={{ display: 'none' }}
              />
              <button 
                className="startpage-btn" 
                onClick={handleChooseClick}
                style={{
                  fontSize: '1.5rem',
                  padding: '0.7em 2em',
                  minHeight: '25px'
                }}
              >
                Choose
              </button>
            </>
          ) : (
            <button 
              className="startpage-btn" 
              onClick={retakePhoto}
              style={{
                fontSize: '1.5rem',
                padding: '0.7em 2em',
                minHeight: '25px'
              }}
            >
              Re-choose
            </button>
          )}
        </div>
        {/* Absolute positioned bottom buttons */}
        <button
          className="startpage-btn"
          style={{ 
            position: 'absolute', 
            left: '2.5%', 
            bottom: '2.5%', 
            width: '28%', 
            minWidth: 90, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center',
            fontSize: '1.5rem',
            padding: '0.7em 2em',
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
            right: '2.5%', 
            bottom: '2.5%', 
            width: '28%', 
            minWidth: 90, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center',
            fontSize: '1.5rem',
            padding: '0.7em 2em',
            minHeight: '25px'
          }}
          onClick={finish}
          disabled={!selected}
        >
          Finish
        </button>
      </div>
    </PhoneFrame>
  );
}