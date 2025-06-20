import React from "react";
import "./PhoneFrame.css";

export default function PhoneFrame({ children }) {
  return (
    <div className="startpage-outer">
      <div
        className="phone-frame"
        style={{
          background: "url('/assets/PhoneFrameBg.png') center center/cover no-repeat"
        }}
      >
        <div className="startpage-bg">
          <div className="startpage-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}