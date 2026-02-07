import './Stats.css';

const Stats = () => {
  const stats = [
    { value: '1+', label: 'Years Experience' },
    { value: '7+', label: 'Completed Projects' },
    { value: '2000+', label: 'Coding Hours' },
    { value: '15+', label: 'Tech Stack' },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;