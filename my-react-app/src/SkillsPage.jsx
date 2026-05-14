import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import BackButton from "./BackButton";
import "./SkillsPage.css";

const skills = [
  { imgSrc: "/python.svg", label: "Python", desc: "Programming Language" },
  { imgSrc: "/javascript.svg", label: "JavaScript", desc: "Programming Language" },
  { imgSrc: "/html.svg", label: "HTML", desc: "Markup Language" },
  { imgSrc: "/css.svg", label: "CSS", desc: "Styling Language" },
  { imgSrc: "/java.svg", label: "Java", desc: "Programming Language" },
  { imgSrc: "/django.svg", label: "Django", desc: "Python Framework" },
  { imgSrc: "/spring.svg", label: "Spring Framework", desc: "Java Framework" },
  { imgSrc: "/sql.svg", label: "SQL", desc: "Database" },
  { imgSrc: "/react.svg", label: "React", desc: "JavaScript Framework" },
  { imgSrc: "/tailwindcss.svg", label: "TailwindCSS", desc: "CSS Framework" },
  { imgSrc: "/figma.svg", label: "Figma", desc: "Design Tool" },
  { imgSrc: "/canva.svg", label: "Canva", desc: "Design Tool" },
  { imgSrc: "/vscode.svg", label: "Visual Studio Code", desc: "IDEs/Code Editors" },
  { imgSrc: "/intellij.svg", label: "IntelliJ", desc: "IDEs/Code Editors" },
  { imgSrc: "/postman.svg", label: "Postman", desc: "API Testing Tool" },
];

const SkillsPage = () => (
  <div>
    <NavBar />
    <BackButton to="/" label="Back" />
    <section className="skills-section" id="skills">
      <div className="container">
        <div className="section-header">
          <h2>Skills</h2>
          <p>Essential Tools I've learned and used!</p>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.label}>
              <img src={skill.imgSrc} alt={skill.label} className="skill-icon" />
              <div>
                <h3 className="skill-name">{skill.label}</h3>
                <p className="skill-description">{skill.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default SkillsPage;