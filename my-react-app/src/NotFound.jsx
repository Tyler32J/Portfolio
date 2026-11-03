import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./NotFound.css";

// Shown for any link that doesn't match a page: the loading-screen compass, drifting with no signal
const NotFound = () => (
  <>
    <NavBar />
    <section className="lost-section">
      <svg className="lost-compass" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="54" className="lost-ring" />
        <circle cx="60" cy="60" r="44" className="lost-ring lost-ring-dashed" />
        <text x="60" y="15" className="lost-north">N</text>
        <g className="lost-needle">
          <path d="M60 22 66 60 60 98 54 60z" className="lost-needle-north" />
          <path d="M60 60 66 60 60 98 54 60z" className="lost-needle-south" />
        </g>
      </svg>
      <span className="lost-code">404 · NO SIGNAL</span>
      <h1 className="lost-title">Signal lost</h1>
      <p className="lost-text">This page doesn't exist. It may have moved, or the link has a typo.</p>
      <Link to="/" className="lost-home btn-shine">Back to home</Link>
    </section>
    <Footer />
  </>
);

export default NotFound;
