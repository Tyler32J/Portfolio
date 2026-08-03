import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import BackButton from "./BackButton";
import "./SkillsPage.css";

// SkillCard component (same as Skills.jsx)
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

  return <div className="skill-card">{cardContent}</div>;
};

const skills = [
  { imgSrc: '/skills/python.svg', label: 'Python', desc: 'Programming Language', link: "https://www.w3schools.com/python/python_intro.asp", category: 'programming' },
  { imgSrc: '/skills/javascript.svg', label: 'JavaScript', desc: 'Programming Language', link: "https://www.w3schools.com/js/js_intro.asp", category: 'programming' },
  { imgSrc: '/skills/html.svg', label: 'HTML', desc: 'Markup Language', link: "https://www.w3schools.com/html/html_intro.asp", category: 'programming' },
  { imgSrc: '/skills/css.svg', label: 'CSS', desc: 'Styling Language', link:"https://www.w3schools.com/css/css_intro.asp", category: 'programming' },
  { imgSrc: '/skills/java.svg', label: 'Java', desc: 'Programming Language', link: "https://www.w3schools.com/js/js_intro.asp", category: 'programming' },
  { imgSrc: '/skills/django.svg', label: 'Django', desc: 'Python Framework', link: "https://www.w3schools.com/django/django_intro.php", category: 'programming' },
  { imgSrc: '/skills/spring.svg', label: 'Spring Framework', desc: 'Java Framework', link: "https://spring.io/projects/spring-framework", category: 'programming' },
  { imgSrc: '/skills/sql.svg', label: 'SQL', desc: 'Database', link: "https://www.w3schools.com/sql/sql_intro.asp", category: 'programming' },
  { imgSrc: '/skills/react.svg', label: 'React', desc: 'JavaScript Framework', link: "https://react.dev/learn/react-compiler/introduction", category: 'programming' },
  { imgSrc: '/skills/tailwindcss.svg', label: 'TailwindCSS', desc: 'CSS Framework', link: "https://tailwindcss.com/docs/styling-with-utility-classes", category: 'programming' },
  { imgSrc: '/skills/figma.svg', label: 'Figma', desc: 'Design Tool', link: "https://www.figma.com/design/", category: 'devtools' },
  { imgSrc: '/skills/canva.svg', label: 'Canva', desc: 'Design Tool', link: "https://www.canva.com/features/", category: 'devtools' },
  { imgSrc: '/skills/vscode.svg', label: 'Visual Studio Code', desc: 'IDEs/Code Editors', link: "https://code.visualstudio.com/docs", category: 'devtools' },
  { imgSrc: '/skills/intellij.svg', label: 'IntelliJ', desc: 'IDEs/Code Editors', link: "https://www.jetbrains.com/idea/", category: 'devtools' },
  { imgSrc: '/skills/github_icon.svg', label: 'GitHub', desc: 'Code Hosting & Version Control', link: "https://github.com/github", category: 'devtools' },
  { imgSrc: '/skills/postman.svg', label: 'Postman', desc: 'API Testing Tool', link: "https://www.postman.com/", category: 'devtools' },
  { imgSrc: '/skills/azure.svg', label: 'Azure', desc: 'Microsoft’s Cloud Platform ', link: "https://azure.microsoft.com", category: 'cloud' },
  { imgSrc: '/skills/azure_devops_icon.svg', label: 'Azure DevOps', desc: 'CI/CD & Project Management', link: "https://azure.microsoft.com/products/devops/", category: 'cloud' },
  { imgSrc: '/skills/intune_icon.png', label: 'Intune', desc: 'Device & App Management', link: "https://learn.microsoft.com/en-us/mem/intune/fundamentals/what-is-intune", category: 'cloud' },
  { imgSrc: '/skills/active-directory.svg', label: 'Active Directory', desc: 'Microsoft’s Cloud Platform ', link: "https://activedirectorypro.com/what-is-active-directory/", category: 'cloud' },
  { imgSrc: '/skills/sharepoint.svg', label: 'Sharepoint', desc: 'Company Sites & File Sharing', link: "https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration", category: 'cloud' },
  { imgSrc: '/skills/excel_icon.svg', label: 'Excel', desc: 'Spreadsheets & Data Analysis', link: "https://www.microsoft.com/en-us/microsoft-365/excel", category: 'cloud' },
  { imgSrc: '/skills/word_icon.svg', label: 'Word', desc: 'Document Creation', link: "https://www.microsoft.com/en-us/microsoft-365/word", category: 'cloud' },
  { imgSrc: '/skills/powerpoint_icon.svg', label: 'PowerPoint', desc: 'Presentations & Slides', link: " https://www.microsoft.com/en-us/microsoft-365/powerpoint", category: 'cloud' },
  { imgSrc: '/skills/onedrive_icon.svg', label: 'OneDrive', desc: 'Cloud Storage', link: "https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage", category: 'cloud' },
  { imgSrc: '/skills/outlook_icon.svg', label: 'Outlook', desc: 'Email & Calendar', link: "https://outlook.live.com/", category: 'cloud' },
  { imgSrc: '/skills/teams_icon.svg', label: 'Teams', desc: 'Chat & Meetings', link: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software", category: 'cloud' },
  { imgSrc: '/skills/zoom_icon.svg', label: 'Zoom', desc: 'Video Meetings & Collaboration', link: " https://zoom.us/", category: 'cloud' },
  { imgSrc: '/skills/google_meet_icon.svg', label: 'Google Meet', desc: 'Video Meetings', link: "https://meet.google.com/", category: 'cloud' },
  { imgSrc: '/skills/google_drive_icon.svg', label: 'Google Drive', desc: 'Cloud Storage', link: "https://drive.google.com/", category: 'cloud' },
  { imgSrc: '/skills/google_docs_icon.svg', label: 'Google docs', desc: 'Online Document Editing', link: "https://docs.google.com/document/", category: 'cloud' },
  { imgSrc: '/skills/company_portal_icon.png', label: 'Company Portal', desc: 'Device & App Management', link: " https://learn.microsoft.com/en-us/mem/intune/apps/company-portal-app", category: 'cloud' },
  // { imgSrc: '/windows stickers_icon.svg', label: 'Windows Stickers', desc: 'Desktop Personalization', link: "" },
  // { imgSrc: '/skills/youtrack_icon.svg', label: 'YouTrack', desc: 'Issue Tracking & Project Management', link: "https://www.jetbrains.com/youtrack/" },
  // { imgSrc: '/skills/clipchamp_icon.png', label: 'ClipChamp', desc: 'Video Editing Tool', link: "https://clipchamp.com/" },
];

const filters = [
  { key: 'all', label: 'All' },
  { key: 'programming', label: 'Programming' },
  { key: 'devtools', label: 'Dev Tools' },
  { key: 'cloud', label: 'Cloud & IT / Workspace Tools' },
];

const SkillsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredSkills =
    activeFilter === 'all'
      ? skills
      : skills.filter((skill) => skill.category === activeFilter);

  return (
    <>
      <NavBar />
      <section className="skills-section" id="skills">
        <div className="skills-container">
          <div className="section-header">
            <h2>Skills</h2>
            <p>Essential Tools I've learned and used!</p>
          </div>
          <div className="skills-toolbar">
            <BackButton to="/" label="Back" />
            <div className="skills-filter-tabs">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  className={`skills-filter-tab ${activeFilter === filter.key ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="skills-grid">
            {filteredSkills.map((skill, key) => (
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
      <Footer />
    </>
  );
};

export default SkillsPage;