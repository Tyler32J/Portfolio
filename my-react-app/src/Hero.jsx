import './Hero.css';

const Hero = () => {
  return (
      <section className="hero-section" id="home">
      <div className="hero-container">
         <div>
          <h1 className="hero-title">Tyler Farrell</h1>
          <h2 className="hero-subtitle">Full Stack Developer</h2>
          
          <p className="hero-text">
            My journey into technology began as a curiosity that quickly turned into a deep passion. I thrive on problem-solving, collaboration, and continuous learning, which led me to pursue a career in software development. I enjoy combining an analytical mindset with creativity to build practical solutions, understanding that technology is more than writing code—it's a way to create impact, improve processes, solve real-world problems, and create opportunities.
          </p>

          <p className="hero-text">
            I am currently completing the full-stack coding program at Base Camp Coding Academy in Water Valley, Mississippi, where I've gained hands-on experience with Python, JavaScript, HTML/CSS, SQL (PostgreSQL), Django, Java, and Spring Framework. Through rigorous coursework and project-based learning, I have developed technical proficiency, problem-solving skills, adaptability, and teamwork. Working on real-world projects has prepared me to tackle the challenges developers face in professional environments.
          </p>

          <p className="hero-text">
            I am committed and eager to learn and grow in my career and technical expertise, including software development, as well as areas like cybersecurity, networking, and other certifications. I welcome new challenges and opportunities to expand my skills and stay up-to-date with emerging technologies.
          </p>
        </div>
        <div className="hero-image-container">
          <img 
            src="/tyler.jpg" 
            alt="Tyler Farrell" 
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;