/*
  This component will display a custom loading spinner with glow animation.
*/
import React from "react";
import "../index.css";

export default function LoadSpinner({ label = "Loading..." }) {
  return (
    <div className="spinner-container">
      <div className="glow-spinner"></div>
      <p className="spinner-label">{label}</p>
    </div>
  );
}
