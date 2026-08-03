import './Projects.css';
import SeeMoreButton from "./SeeMoreButton";
import useInView from "./useInView";

const projects = [
  {
    id: 1,
    title: "Sportsman's Journal",
    description: "Sportsman's Journal is a personal field log designed for hunters and anglers who value accurate records and lasting memories. Log your hunts, record your catches, and build a personal outdoor journal.",
    image: "/projects/sportsman_journal.png",
    link: "https://web-production-e5e3.up.railway.app/",
    tech: "Django, Html, CSS"
  },
  {
    id: 3,
    title: "Brad's Honey & Bee Removal",
    description: "Professional bee removal and locally harvested honey business website.",
    image: "/projects/brads_bees.png",
    link: "https://brads-bees-production.up.railway.app/",
    tech: "Django, Html, CSS"
  },
  {
    id: 4,
    title: "Betting on the Races",
    description: "Put your racing knowledge to the test by betting on your favorite drivers. Pick who you think will win and place your bet,",
    image: "/projects/betting_on_the_races.png",
    link: "https://betting-on-the-races-react-production.up.railway.app",
    tech: "React, Html, CSS"
  },
  {
    id: 5,
    title: "The Goat",
    description: "Master Chief is more than a warrior; he is a symbol of hope and courage. In the face of impossible odds, he stands unbroken, fighting not for himself, but for the survival of humanity.",
    image: "/projects/halo_background.png",
    link: "https://goat-project-production.up.railway.app",
    tech: "Html & CSS"
  },
  {
    id: 6,
    title: "Dice Game (Terminal)",
    description: "A simple Python terminal dice game where the player rolls a virtual die to get a random number between 1 and 6, with results displayed in the console. Players can roll repeatedly and try to beat their previous rolls.",
    image: "/projects/dice_rolling_simulator.png",
    link: "https://github.com/Tyler32J/Dice-Game.git",
    tech: "Python"
  },
  {
    id: 7,
    title: "Game Collection Manager (Terminal) ",
    description: "Game Collection Manager is a Java terminal application designed to help users manage their personal video game library. Users can add new games, view their collection, update information, and remove games they no longer own.",
    image: "/projects/game_collection_manager.png",
    link: "https://github.com/Tyler32J/Game-Collection-Manager",
    tech: "Java"
  }
];

const Projects = () => {
  const [gridRef, inView] = useInView({ threshold: 0.2 });

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <h2>Projects</h2>
        <p>Projects I’ve built & helped worked on!</p>
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
            <div className="project-card">
              <div className="project-img-wrapper">
                <img src={project.image} alt={project.title} className="project-img" />
              </div>
              <div className="project-content">
                <h3 className="project-name">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-footer">
                  <div className="project-tech">{project.tech}</div>
                  <a
                    href={project.link}
                    className="view-project-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
