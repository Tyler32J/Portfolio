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
            <li><a href="#home">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Get In Touch</h4>
          <ul className="footer-contact">
            <li>
              <span className="contact-icon">📧</span>
              <span>tfarrell@basecampcodingacademy.org</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>+1 (228) 363-3068</span>
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