import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3 className="footer-name">Tyler Farrell</h3>
          <p className="footer-tagline">
            "Full-Stack Developer | React | JavaScript | Always learning"
          </p>
          <div className="footer-socials">
            <a
              href="https://github.com/Tyler32J"
              className="footer-social-icon"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <img src="/assets/github.svg" alt="GitHub" className="social-img" />
            </a>

            <a
              href="https://www.linkedin.com/in/tyler-farrell-9233a8329/"
              className="footer-social-icon"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <img src="/assets/linkedin.svg" alt="LinkedIn" className="social-img" />
            </a>

            <a
              href="/assets/resume.pdf"
              className="footer-social-icon"
              target="_blank"
              rel="noreferrer"
              aria-label="Resume"
            >
              <img src="/assets/resume.svg" alt="Resume" className="social-img" />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/skills">Skills</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/certifications">Certifications</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Get In Touch</h4>
          <ul className="footer-contact">
            <li>
              <svg
                className="footer-contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span><a href="mailto:farrelltyler32@gmail.com">farrelltyler32@gmail.com</a></span>
            </li>
            <li>
              <svg
                className="footer-contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6.2 6.2l1.4-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.6 2.6.7A2 2 0 0 1 22 16.9z" />
              </svg>
              <span><a href="tel:+12283633068">+1 (228) 363-3068</a></span>
            </li>
            <li>
              <svg
                className="footer-contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>Grenada, MS</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tyler Farrell. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;