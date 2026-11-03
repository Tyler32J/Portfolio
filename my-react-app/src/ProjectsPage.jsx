import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import BackButton from "./BackButton";
import useInView from "./useInView";
import { handleSpotlight, handleSpotlightLeave } from "./spotlight";
import ProjectDetails from "./ProjectDetails";
import "./Projects.css";


const projects = [
  {
    id: 1,
    title: "Sportsman's Journal",
    description: "Sportsman's Journal is a personal field log designed for hunters and anglers who value accurate records and lasting memories. Log your hunts, record your catches, and build a personal outdoor journal.",
    image: "/projects/sportsman_journal.webp",
    link: "https://web-production-e5e3.up.railway.app/",
    tech: "Django, Html, CSS",
    category: "website"
  },
  {
    id: 2,
    title: "Brad's Honey & Bee Removal",
    description: "Professional bee removal and locally harvested honey business website.",
    image: "/projects/brads_bees.webp",
    link: "https://brads-bees-production.up.railway.app/",
    tech: "Django, Html, CSS",
    category: "website"
  },
  {
    id: 3,
    title: "Veterans of Foreign Wars (VFW)",
    description: "This is a website for the non-profit government post of Grenada MS. I am making this in hopes of helping the local VFW modernize their approach in gaining member and donations.",
    image: "/projects/vfw.webp",
    link: "https://grenadamsvfwwebsite-production.up.railway.app",
    tech: "React, Html, CSS",
    category: "website"
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
    image: "/projects/game_collection_manager.webp",
    link: "https://game-collection-manager-production.up.railway.app",
    tech: "React, Html, CSS",
    category: "website"
  },
  {
    id: 6,
    title: "Betting on the Races",
    description: "Put your racing knowledge to the test by betting on your favorite drivers. Pick who you think will win and place your bet,",
    image: "/projects/betting_on_the_races.webp",
    link: "https://betting-on-the-races-react-production.up.railway.app",
    tech: "React, Html, CSS",
    category: "website"
  },
  {
    id: 7,
    title: "The Goat",
    description: "Master Chief is more than a warrior; he is a symbol of hope and courage. In the face of impossible odds, he stands unbroken, fighting not for himself, but for the survival of humanity.",
    image: "/projects/halo_background.webp",
    link: "https://goat-project-production.up.railway.app",
    tech: "Html & CSS",
    category: "website"
  },
  {
    id: 8,
    title: "Dice Game (Terminal)",
    description: "A simple Python terminal dice game where the player rolls a virtual die to get a random number between 1 and 6, with results displayed in the console. Players can roll repeatedly and try to beat their previous rolls.",
    image: "/projects/dice_rolling_simulator.webp",
    link: "https://github.com/Tyler32J/Dice-Game-Terminal-",
    // Real code that visitors can run in the project popup (see terminalPrograms.js)
    play: "dice-game",
    tech: "Python",
    category: "game"
  },
  {
    id: 9,
    title: "Game Collection Manager (Terminal) ",
    description: "Game Collection Manager is a Java terminal application designed to help users manage their personal video game library. Users can add new games, view their collection, update information, and remove games they no longer own.",
    image: "/projects/game_collection_manager_terminal.webp",
    link: "https://github.com/Tyler32J/Game-Collection-Manager-Terminal-",
    // Browser version visitors can run in the project popup (see terminalPrograms.js)
    play: "game-collection-manager",
    tech: "Java",
    category: "game"
  }
];

const filters = [
  { key: "all", label: "All" },
  { key: "website", label: "Websites" },
  { key: "app", label: "Apps" },
  { key: "game", label: "Games" },
];

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [gridRef] = useInView({ threshold: 0.15 }, () => setRevealed(true));

  const handleFilterClick = (key) => {
    setActiveFilter(key);
    setRevealed(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setRevealed(true));
    });
  };

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
  <>
    <NavBar />
    <section className="projects-section" id="projects">
      <div className="section-header">
        <h2>Projects</h2>
        <p>Real-world projects I’ve built!</p>
      </div>
      <div className="projects-toolbar">
        <BackButton to="/#projects" label="Back" />
        <div className="project-filter-tabs">
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`project-filter-tab ${activeFilter === filter.key ? "active" : ""}`}
              onClick={() => handleFilterClick(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      {filteredProjects.length === 0 ? (
        <p className="projects-empty-state">More projects in this category are on the way — check back soon!</p>
      ) : (
      <div className="projects-grid" ref={gridRef} key={activeFilter}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`project-reveal ${revealed ? "in" : ""}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div
              className="project-card"
              onPointerMove={handleSpotlight}
              onPointerLeave={handleSpotlightLeave}
            >
              <div className="project-img-wrapper">
                <img src={project.image} alt={project.title} className="project-img" />
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
      )}
      {selected && <ProjectDetails project={selected} onClose={() => setSelected(null)} />}
    </section>
    <Footer />
  </>
  );
};

export default ProjectsPage;