import { useEffect, useState } from 'react';
import './Hero.css';

const roles = ['Full Stack Developer', 'IT Technician'];

// Types each role out, pauses, deletes it, then moves to the next
const useTypedRole = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [length, setLength] = useState(roles[0].length);
  const [deleting, setDeleting] = useState(true);
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (reduceMotion) return;

    const role = roles[roleIndex];
    let delay = deleting ? 45 : 85;
    if (!deleting && length === role.length) delay = 1600;
    if (deleting && length === 0) delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && length === role.length) {
        setDeleting(true);
      } else if (deleting && length === 0) {
        setDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      } else {
        setLength(length + (deleting ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [roleIndex, length, deleting, reduceMotion]);

  return reduceMotion ? roles[0] : roles[roleIndex].slice(0, length);
};

const Hero = () => {
  const typedRole = useTypedRole();

  return (
      <section className="hero-section" id="home">
      <div className="hero-container">
         <div>
          <h1 className="hero-title">
            Tyler <span className="hero-title-last">Farrell</span>
          </h1>
          <h2 className="hero-subtitle" aria-label="Full Stack Developer and IT Technician">
            {/* Shown like a command prompt, with a blinking block cursor after the typed role */}
            <span aria-hidden="true">
              <span className="hero-prompt">&gt; </span>
              I'm a <span className="hero-typed">{typedRole || '​'}</span>
            </span>
          </h2>
          
          <p className="hero-text">
            My journey into technology started with a simple curiosity — a desire to understand how things work and how ideas become real solutions. That curiosity grew into a passion for building, learning, and solving meaningful problems. It led me to pursue a career in tech, where software development was just the beginning. Over time, I’ve realized that technology is more than writing code — it’s a constantly evolving field that challenges you to learn, adapt, and push boundaries, all while creating tools that make a real impact.
          </p>

          <p className="hero-text">
            As I continued exploring the tech world, I found myself drawn to building things that actually work — tools, features, and projects that solve real problems. Every project pushed me to think differently, experiment, and refine my approach. Over time, that process taught me the value of curiosity, persistence, and learning through doing. It showed me how much I enjoy turning ideas into something real and meaningful, and it pushed me to keep growing as a creator, builder, and problem‑solver.
          </p>

          <p className="hero-text">
            Today, I’m focused on expanding my knowledge, sharpening my craft, and exploring new areas across the tech landscape. I’m committed to continuous growth — whether that means diving deeper into software development, exploring cybersecurity, learning more about networking, or pursuing new certifications and education. I welcome challenges that push me forward and opportunities that allow me to contribute to meaningful, impactful work.
          </p>
        </div>
        <div className="hero-image-container">
          <div className="hero-image-frame">
            <img
              src="/assets/portfolio_image.webp"
              alt="Tyler Farrell"
              className="hero-image"
            />
            {/* Teal viewfinder-style brackets at each corner of the photo */}
            <span className="hero-corner hero-corner-tl" aria-hidden="true" />
            <span className="hero-corner hero-corner-tr" aria-hidden="true" />
            <span className="hero-corner hero-corner-bl" aria-hidden="true" />
            <span className="hero-corner hero-corner-br" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;