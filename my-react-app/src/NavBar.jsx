import { useState } from "react";
import './NavBar.css';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Portfolio.</div>
        
        <div className={`navbar-menu ${open ? 'open' : ''}`}>
          <a className="navbar-link" href="#home">Home</a>
          <a className="navbar-link" href="#skills">Skills</a>
          <a className="navbar-link" href="#projects">Projects</a>
          <a className="navbar-link" href="#contact">Contact</a>
        </div>

        <div className="navbar-socials">
          <a
            href="https://github.com/Tyler32J"
            className="navbar-social-icon"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <img src="/github.svg" alt="GitHub" />
          </a>

          <a
            href="https://www.linkedin.com/in/tyler-farrell-9233a8329/"
            className="navbar-social-icon"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <img src="/linkedin.svg" alt="LinkedIn" />
          </a>

          <a
            href="/resume.pdf"
            className="navbar-social-icon"
            target="_blank"
            rel="noreferrer"
            aria-label="Resume"
          >
            <img src="/resume.svg" alt="Resume" />
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