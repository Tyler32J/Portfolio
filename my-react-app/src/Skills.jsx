import './Skills.css';
import SeeMoreButton from "./SeeMoreButton";

const SkillCard = ({ imgSrc, label, desc, link }) => {
  const cardContent = (
    <>
      <img src={imgSrc} alt={label} className="skill-icon" />
      <div className="skill-content">
        <h3 className="skill-name">{label}</h3>
        <p className="skill-description">{desc}</p>
      </div>
    </>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noreferrer" className="skill-card-link">
        <div className="skill-card">
          {cardContent}
        </div>
      </a>
    );
  }

  return (
    <div className="skill-card">
      {cardContent}
    </div>
  );
};


const skills = [
  { imgSrc: '/python.svg', label: 'Python', desc: 'Programming Language', link: "https://www.w3schools.com/python/python_intro.asp" },
  { imgSrc: '/javascript.svg', label: 'JavaScript', desc: 'Programming Language', link: "https://www.w3schools.com/js/js_intro.asp" },
  { imgSrc: '/html.svg', label: 'HTML', desc: 'Markup Language', link: "https://www.w3schools.com/html/html_intro.asp" },
  { imgSrc: '/css.svg', label: 'CSS', desc: 'Styling Language', link:"https://www.w3schools.com/css/css_intro.asp" },
  { imgSrc: '/java.svg', label: 'Java', desc: 'Programming Language', link: "https://www.w3schools.com/js/js_intro.asp" },
  { imgSrc: '/django.svg', label: 'Django', desc: 'Python Framework', link: "https://www.w3schools.com/django/django_intro.php" },
  { imgSrc: '/spring.svg', label: 'Spring Framework', desc: 'Java Framework', link: "https://spring.io/projects/spring-framework" },
  { imgSrc: '/sql.svg', label: 'SQL', desc: 'Database', link: "https://www.w3schools.com/sql/sql_intro.asp" },
  { imgSrc: '/react.svg', label: 'React', desc: 'JavaScript Framework', link: "https://react.dev/learn/react-compiler/introduction" },
  { imgSrc: '/tailwindcss.svg', label: 'TailwindCSS', desc: 'CSS Framework', link: "https://tailwindcss.com/docs/styling-with-utility-classes" },
  { imgSrc: '/figma.svg', label: 'Figma', desc: 'Design Tool', link: "https://www.figma.com/design/" },
  { imgSrc: '/canva.svg', label: 'Canva', desc: 'Design Tool', link: "https://www.canva.com/features/" },
  { imgSrc: '/vscode.svg', label: 'Visual Studio Code', desc: 'IDEs/Code Editors', link: "https://code.visualstudio.com/docs" },
  { imgSrc: '/intellij.svg', label: 'IntelliJ', desc: 'IDEs/Code Editors', link: "https://www.jetbrains.com/idea/" },
  { imgSrc: '/github_icon.svg', label: 'GitHub', desc: 'Code Hosting & Version Control', link: "https://github.com/github" },
];

const Skills = () => (
  <section className="skills-section" id="skills">
    <div className="skills-container">
      <div className="section-header">
        <h2>Skills</h2>
        <p>Essential Tools I've learned and used!</p>
      </div>
      <div className="see-more-container">
        <SeeMoreButton href="/skills" />
      </div>
      <div className="skills-grid">
        {skills.map((skill, key) => (
          <SkillCard
            key={key}
            imgSrc={skill.imgSrc}
            label={skill.label}
            desc={skill.desc}
            link={skill.link}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Skills;