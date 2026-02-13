import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Sportsman's Journal",
      description: "Sportsman's Journal is a personal field log designed for hunters and anglers who value accurate records and lasting memories. Log your hunts, record your catches, and build a personal outdoor journal.",
      image: "/sportsman_journal.png",
      // link: "http://127.0.0.1:8000/"
      link: " https://tyler32j.github.io/Sportsman-Journal-Project/"
    },
    // {
    //   id: 2,
    //   title: "TJ's Handyman Service",
    //   description:"Still in Development",
    //   // description: "Experienced handyman delivering efficient, affordable solutions for repairs, installations, and general maintenance.",
    //   image: "/comingsoon.png",
    //   link: ""
    // },
    // {
    //   id: 3,
    //   title: "Brad's Honey & Bee Removal",
    //   description: "Still in Development",
    //   image: "/comingsoon.png",
    //   link: ""
    // },
    {
      id: 4,
      title: "Betting on the Races!",
      description: "Put your racing knowledge to the test by betting on your favorite drivers. Pick who you think will win and place your bet,",
      image: "/betting_on_the_races.png",
      link: "https://github.com/jrsossaman/Betting-On-The-Races-React"
    },
    {
      id: 5,
      title: "The Goat",
      description: "Master Chief is more than a warrior; he is a symbol of hope and courage. In the face of impossible odds, he stands unbroken, fighting not for himself, but for the survival of humanity.",
      image: "/halo_background.png",
      link: "https://github.com/Tyler32J/GOAT"
    },
    // {
    //   id: 6,
    //   title: "",
    //   description: "",
    //   image: "/comingsoon.png",
    //   link: ""
    // }
  ];

  return (
    <section className="projects-section" id="projects">
      <h2 className="projects-title">Projects</h2>
      <p className="projects-subtitle">Projects I've created during base camp.</p>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image" style={{ backgroundImage: `url(${project.image})` }}>
              <h3 className="project-name">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <a href={project.link} className="view-project-btn">
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;