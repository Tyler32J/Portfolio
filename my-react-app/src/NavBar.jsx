import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useTheme from "./useTheme";
import ThemeToggle from "./ThemeToggle";
import CircuitSignals from "./CircuitSignals";
import { RESUME_URL, openResume } from "./resume";
import './NavBar.css';

// The navbar is shorter than one pattern tile, so its signals run along the top trace only
const navSignals = [
  { trace: "top", x: 0.05, row: 0, dur: 4, delay: 0 },
  { trace: "top", x: 0.35, row: 0, dur: 5, delay: -2.2 },
  { trace: "top", x: 0.62, row: 0, dur: 4.5, delay: -1 },
  { trace: "top", x: 0.9, row: 0, dur: 5.5, delay: -3.4 },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const pillRef = useRef(null);

  // Slides the teal pill behind whichever link is hovered or focused (styled by .navbar-pill)
  const movePill = (e) => {
    const link = e.target.closest?.(".navbar-link");
    const pill = pillRef.current;
    if (!link || !pill) return;

    const place = () => {
      pill.style.width = `${link.offsetWidth + 24}px`;
      pill.style.height = `${link.offsetHeight + 12}px`;
      pill.style.transform = `translate(${link.offsetLeft - 12}px, ${link.offsetTop - 6}px)`;
    };

    // Appear in place the first time instead of sliding in from the corner
    if (!pill.classList.contains("is-visible")) {
      pill.style.transition = "none";
      place();
      void pill.offsetWidth;
      pill.style.transition = "";
      pill.classList.add("is-visible");
    } else {
      place();
    }
  };

  const hidePill = () => pillRef.current?.classList.remove("is-visible");
  const [theme, toggleTheme] = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <nav className="navbar">
      <CircuitSignals signals={navSignals} />
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" aria-label="Tyler Farrell, home">
          <span className="navbar-logo-mark" aria-hidden="true">TF</span>
          <span className="navbar-logo-text" aria-hidden="true">
            <span className="navbar-logo-name">Tyler Farrell</span>
            <span className="navbar-logo-tagline">Developer · IT</span>
          </span>
        </Link>

        <div
          className={`navbar-menu ${open ? "open" : ""}`}
          onPointerOver={movePill}
          onPointerLeave={hidePill}
          onFocus={movePill}
          onBlur={hidePill}
        >
          <span ref={pillRef} className="navbar-pill" aria-hidden="true" />
          <NavLink className="navbar-link" to="/" end>Home</NavLink>
          <NavLink className="navbar-link" to="/skills">Skills</NavLink>
          <NavLink className="navbar-link" to="/projects">Projects</NavLink>
          <NavLink className="navbar-link" to="/certifications">Certifications</NavLink>
          <NavLink className="navbar-link" to="/contact">Contact</NavLink>
        </div>

        <div className="navbar-socials">
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
            href={RESUME_URL}
            className="navbar-social-icon"
            target="_blank"
            rel="noreferrer"
            aria-label="Resume"
            onClick={openResume}
          >
            <img src="/assets/resume.svg" alt="Resume" />
          </a>

          <button
            type="button"
            className="navbar-social-icon command-search-btn"
            onClick={() => window.dispatchEvent(new Event("open-command-menu"))}
            aria-label="Search the site (Ctrl+K)"
            title="Search the site (Ctrl+K)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        <div className="navbar-mobile-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} className="navbar-mobile-theme-toggle" />
          <button
            onClick={() => setOpen(!open)}
            className="navbar-button"
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      <div className="navbar-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
    </nav>
  );
};

export default NavBar;