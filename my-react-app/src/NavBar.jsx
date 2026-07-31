import { useState } from "react";
import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Portfolio</div>
        
        <div className="navbar-menu">
          <Link className="navbar-link" to="/">Home</Link>
          <Link className="navbar-link" to="/skills">Skills</Link>
          <Link className="navbar-link" to="/projects">Projects</Link>
          <Link className="navbar-link" to="/certifications">Certifications</Link>
          <Link className="navbar-link" to="/contact">Contact</Link>
        </div>

        <div className="navbar-socials">
          <a
            href="https://github.com/Tyler32J"
            className="navbar-social-icon"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <img src="/assets/github.svg" alt="GitHub" />
          </a>

          <a
            href="https://www.linkedin.com/in/tyler-farrell-9233a8329/"
            className="navbar-social-icon"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <img src="/assets/linkedin.svg" alt="LinkedIn" />
          </a>

          <a
            href="/assets/resume.pdf"
            className="navbar-social-icon"
            target="_blank"
            rel="noreferrer"
            aria-label="Resume"
          >
            <img src="/assets/resume.svg" alt="Resume" />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="navbar-button"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;