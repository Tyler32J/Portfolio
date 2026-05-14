// src/SeeMoreButton.jsx
import React from "react";
import './SeeMoreButton.css';

const SeeMoreButton = ({ href }) => (
  <a href={href} className="see-more-btn">
    <span>See More</span>
    <svg
      className="arrow-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  </a>
);

export default SeeMoreButton;