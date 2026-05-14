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
              <img src="/github.svg" alt="GitHub" className="social-img" />
            </a>

            <a
              href="https://www.linkedin.com/in/tyler-farrell-9233a8329/"
              className="footer-social-icon"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <img src="/linkedin.svg" alt="LinkedIn" className="social-img" />
            </a>

            <a
              href="/resume.pdf"
              className="footer-social-icon"
              target="_blank"
              rel="noreferrer"
              aria-label="Resume"
            >
              <img src="/resume.svg" alt="Resume" className="social-img" />
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
              <span className="contact-icon">📧</span>
              <span><a href="mailto:tfarrell@basecampcodingacademy.org">tfarrell@basecampcodingacademy.org</a></span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span><a href="tel:+12283633068">+1 (228) 363-3068</a></span>
            </li>
            <li>
              <span className="contact-icon">📍</span>
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