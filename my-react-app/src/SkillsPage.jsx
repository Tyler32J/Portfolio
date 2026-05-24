import React from "react";
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
  { imgSrc: '/postman.svg', label: 'Postman', desc: 'API Testing Tool', link: "https://www.postman.com/" },
  { imgSrc: '/azure.svg', label: 'Azure', desc: 'Microsoft’s Cloud Platform ', link: "https://azure.microsoft.com" },
  { imgSrc: '/azure_devops_icon.svg', label: 'Azure DevOps', desc: 'CI/CD & Project Management', link: "https://azure.microsoft.com/products/devops/" },
  { imgSrc: '/intune_icon.png', label: 'Intune', desc: 'Device & App Management', link: "https://learn.microsoft.com/en-us/mem/intune/fundamentals/what-is-intune" },
  { imgSrc: '/active-directory.svg', label: 'Active Directory', desc: 'Microsoft’s Cloud Platform ', link: "https://activedirectorypro.com/what-is-active-directory/" },
  { imgSrc: '/sharepoint.svg', label: 'Sharepoint', desc: 'Company Sites & File Sharing', link: "https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration" },
  { imgSrc: '/excel_icon.svg', label: 'Excel', desc: 'Spreadsheets & Data Analysis', link: "https://www.microsoft.com/en-us/microsoft-365/excel" },
  { imgSrc: '/word_icon.svg', label: 'Word', desc: 'Document Creation', link: "https://www.microsoft.com/en-us/microsoft-365/word" },
  { imgSrc: '/powerpoint_icon.svg', label: 'PowerPoint', desc: 'Presentations & Slides', link: " https://www.microsoft.com/en-us/microsoft-365/powerpoint" },
  { imgSrc: '/onedrive_icon.svg', label: 'OneDrive', desc: 'Cloud Storage', link: "https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage" },
  { imgSrc: '/outlook_icon.svg', label: 'Outlook', desc: 'Email & Calendar', link: "https://outlook.live.com/" },
  { imgSrc: '/teams_icon.svg', label: 'Teams', desc: 'Chat & Meetings', link: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software" },
  { imgSrc: '/zoom_icon.svg', label: 'Zoom', desc: 'Video Meetings & Collaboration', link: " https://zoom.us/" },
  { imgSrc: '/google_meet_icon.svg', label: 'Google Meet', desc: 'Video Meetings', link: "https://meet.google.com/" },
  { imgSrc: '/google_drive_icon.svg', label: 'Google Drive', desc: 'Cloud Storage', link: "https://drive.google.com/" },
  { imgSrc: '/google_docs_icon.svg', label: 'Google docs', desc: 'Online Document Editing', link: "https://docs.google.com/document/" },
  { imgSrc: '/company_portal_icon.png', label: 'Company Portal', desc: 'Device & App Management', link: " https://learn.microsoft.com/en-us/mem/intune/apps/company-portal-app" },
  // { imgSrc: '/windows stickers_icon.svg', label: 'Windows Stickers', desc: 'Desktop Personalization', link: "" },
  // { imgSrc: '/youtrack_icon.svg', label: 'YouTrack', desc: 'Issue Tracking & Project Management', link: "https://www.jetbrains.com/youtrack/" },
  // { imgSrc: '/clipchamp_icon.png', label: 'ClipChamp', desc: 'Video Editing Tool', link: "https://clipchamp.com/" },
];

const SkillsPage = () => (
  <>
    <NavBar />
    <BackButton to="/" label="Back" />
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <div className="section-header">
          <h2>Skills</h2>
          <p>Essential Tools I've learned and used!</p>
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
    <Footer />
  </>
);

export default SkillsPage;