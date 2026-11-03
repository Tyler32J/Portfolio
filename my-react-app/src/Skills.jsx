import './Skills.css';
import SeeMoreButton from "./SeeMoreButton";
import useInView from "./useInView";

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
  { imgSrc: '/skills/python.svg', label: 'Python', desc: 'Programming Language', link: "https://www.w3schools.com/python/python_intro.asp" },
  { imgSrc: '/skills/javascript.svg', label: 'JavaScript', desc: 'Programming Language', link: "https://www.w3schools.com/js/js_intro.asp" },
  { imgSrc: '/skills/html.svg', label: 'HTML', desc: 'Markup Language', link: "https://www.w3schools.com/html/html_intro.asp" },
  { imgSrc: '/skills/css.svg', label: 'CSS', desc: 'Styling Language', link:"https://www.w3schools.com/css/css_intro.asp" },
  { imgSrc: '/skills/java.svg', label: 'Java', desc: 'Programming Language', link: "https://www.w3schools.com/java/java_intro.asp" },
  { imgSrc: '/skills/django.svg', label: 'Django', desc: 'Python Framework', link: "https://www.w3schools.com/django/django_intro.php" },
  { imgSrc: '/skills/spring.svg', label: 'Spring Framework', desc: 'Java Framework', link: "https://spring.io/projects/spring-framework" },
  { imgSrc: '/skills/sql.svg', label: 'SQL', desc: 'Database', link: "https://www.w3schools.com/sql/sql_intro.asp" },
  { imgSrc: '/skills/react.svg', label: 'React', desc: 'JavaScript Framework', link: "https://react.dev/learn/react-compiler/introduction" },
  { imgSrc: '/skills/tailwindcss.svg', label: 'TailwindCSS', desc: 'CSS Framework', link: "https://tailwindcss.com/docs/styling-with-utility-classes" },
  { imgSrc: '/skills/figma.svg', label: 'Figma', desc: 'Design Tool', link: "https://www.figma.com/design/" },
  { imgSrc: '/skills/canva.svg', label: 'Canva', desc: 'Design Tool', link: "https://www.canva.com/features/" },
  { imgSrc: '/skills/vscode.svg', label: 'Visual Studio Code', desc: 'IDEs/Code Editors', link: "https://code.visualstudio.com/docs" },
  { imgSrc: '/skills/intellij.svg', label: 'IntelliJ', desc: 'IDEs/Code Editors', link: "https://www.jetbrains.com/idea/" },
   { imgSrc: '/skills/postman.svg', label: 'Postman', desc: 'API Testing Tool', link: "https://www.postman.com/", category: 'devtools' },
  { imgSrc: '/skills/github_icon.svg', label: 'GitHub', desc: 'Code Hosting & Version Control', link: "https://github.com/github" },
];

const skillGroups = [
  { title: 'Languages', labels: ['Python', 'JavaScript', 'Java', 'SQL', 'HTML', 'CSS'] },
  { title: 'Frameworks', labels: ['Django', 'Spring Framework', 'React', 'TailwindCSS'] },
  { title: 'Tools', labels: ['Figma', 'Canva', 'Visual Studio Code', 'IntelliJ', 'Postman', 'GitHub'] },
];

const Skills = () => {
  const [gridRef, inView] = useInView({ threshold: 0.2 });
  let revealIndex = 0;

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <div className="section-header">
          <h2>Skills</h2>
          <p>Essential Tools I've learned and used!</p>
        </div>
        <div className="see-more-container">
          <SeeMoreButton href="/skills" />
        </div>
        <div className="skill-groups" ref={gridRef}>
          {skillGroups.map((group) => (
            <div key={group.title} className="skill-group">
              <h3 className="skill-group-title">{group.title}</h3>
              <div className="skills-grid">
                {group.labels.map((label) => {
                  const skill = skills.find((s) => s.label === label);
                  const delay = revealIndex++ * 60;
                  return (
                    <div
                      key={skill.label}
                      className={`skill-reveal ${inView ? "in" : ""}`}
                      style={{ transitionDelay: `${delay}ms` }}
                    >
                      <SkillCard
                        imgSrc={skill.imgSrc}
                        label={skill.label}
                        desc={skill.desc}
                        link={skill.link}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;