import { useState } from "react";
import './Projects.css';
import SeeMoreButton from "./SeeMoreButton";
import useInView from "./useInView";
import { handleSpotlight, handleSpotlightLeave } from "./spotlight";
import ProjectDetails from "./ProjectDetails";

const projects = [
  {
    id: 1,
    title: "Sportsman's Journal",
    description: "Sportsman's Journal is a personal field log designed for hunters and anglers who value accurate records and lasting memories. Log your hunts, record your catches, and build a personal outdoor journal.",
    image: "/projects/sportsman_journal.png",
    imagePosition: "top",
    link: "https://web-production-e5e3.up.railway.app/",
    tech: "Django, Html, CSS"
  },
  {
    id: 2,
    title: "Brad's Honey & Bee Removal",
    description: "Professional bee removal and locally harvested honey business website.",
    image: "/projects/brads_bees.webp",
    link: "https://brads-bees-production.up.railway.app/",
    tech: "Django, Html, CSS"
  },
  {
    id: 3,
    title: "Veterans of Foreign Wars (VFW)",
    description: "This is a website for the non-profit government post of Grenada MS. I am making this in hopes of helping the local VFW modernize their approach in gaining member and donations.",
    image: "/projects/vfw.webp",
    link: "https://grenadamsvfwwebsite-production.up.railway.app",
    tech: "React, Html, CSS"
  },
  {
    id: 4,
    title: "TJ's Trading Post",
    description: " A single-seller resale storefront. Owner-gated listing management, browsable marketplace, and support for sale/trade/wanted listing",
    image: "/projects/tjs_trading_post.webp",
    link: "https://tj-s-trading-post-production-4894.up.railway.app",
    tech: "React, Html, CSS",
    category: "website"
  },
  {
    id: 5,
    title: "Game Collection Manager",
    description: "Game Collection Manager is a full-stack web app designed to help users manage their personal video game library. Users can add new games, view their collection, update information, and remove games they no longer own.",
    image: "/projects/game_collection_manager.png",
    imagePosition: "top",
    link: "https://game-collection-manager-production.up.railway.app",
    tech: "React, Html, CSS"
  },
  {
    id: 6,
    title: "Betting on the Races",
    description: "Put your racing knowledge to the test by betting on your favorite drivers. Pick who you think will win and place your bet,",
    image: "/projects/betting_on_the_races.webp",
    link: "https://betting-on-the-races-react-production.up.railway.app",
    tech: "React, Html, CSS"
  },
];

const Projects = () => {
  const [gridRef, inView] = useInView({ threshold: 0.2 });
  const [selected, setSelected] = useState(null);

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <h2>Projects</h2>
        <p>Projects I’ve built and helped work on!</p>
      </div>
      <div className="see-more-container">
        <SeeMoreButton href="/projects" />
      </div>
      <div className="projects-grid" ref={gridRef}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-reveal ${inView ? "in" : ""}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div
              className="project-card"
              onPointerMove={handleSpotlight}
              onPointerLeave={handleSpotlightLeave}
            >
              <div className="project-img-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                  style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
                />
              </div>
              <div className="project-content">
                <h3 className="project-name">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-footer">
                  <div className="project-tech">{project.tech}</div>
                  <button
                    type="button"
                    className="view-project-btn"
                    onClick={() => setSelected(project)}
                  >
                    View Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selected && <ProjectDetails project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default Projects;
