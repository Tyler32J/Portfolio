import './Hero.css';

const Hero = () => {
  return (
      <section className="hero-section" id="home">
      <div className="hero-container">
         <div>
          <h1 className="hero-title">Tyler Farrell</h1>
          <h2 className="hero-subtitle">Full Stack Developer / IT Technician</h2>
          
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
          <img 
            src="/assets/portfolio_image.png"
            alt="Tyler Farrell" 
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;