import React from "react";
import "./PhoneFrame.css";

export default function PhoneFrame({ children }) {
  return (
    <div className="startpage-outer">
      <div
        className="phone-frame"
        style={{
          background: `url('/assets/WhiteCrumpled.png') center center/cover no-repeat`,
        }}
      >
        <div className="startpage-bg">
          {/* Decorative assets positioned as in Figma */}
          <img src="/assets/LovePhone.png" alt="love phone" className="decor-lovephone" />
          <img src="/assets/DiscoRibbon.png" alt="disco ribbon" className="decor-discoribbon" />
          <img src="/assets/RedButton.png" alt="red button" className="decor-redbutton" />
          <img src="/assets/PixelFolder.png" alt="pixel folder" className="decor-pixelfolder" />
          <img src="/assets/FlowerButton.png" alt="flower button" className="decor-flowerbutton" />
          <img src="/assets/ClamBlue.png" alt="clam blue" className="decor-clamblue" />
          <img src="/assets/FlipPhone.png" alt="flip phone" className="decor-flipphone" />
          <img src="/assets/Polaroid.png" alt="polaroid" className="decor-polaroid" />
          <img src="/assets/DigitalCamera.png" alt="digital camera" className="decor-digitalcamera" />
          <img src="/assets/PinkRibbon.png" alt="pink ribbon" className="decor-pinkribbon" />
          {/* Main content */}
          <div className="startpage-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 