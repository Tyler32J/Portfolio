import { useNavigate } from "react-router-dom";
import "./BackButton.css";

const BackButton = ({ label = "Back" }) => {
  const navigate = useNavigate();

  return (
    <div className="back-btn-container">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
        aria-label={label}
      >
        <svg
          className="back-arrow-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>{label}</span>
      </button>
    </div>
  );
};

export default BackButton;