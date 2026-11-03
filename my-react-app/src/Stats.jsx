import { useEffect, useState } from 'react';
import useInView from './useInView';
import './Stats.css';

const statsData = [
  { target: 1, suffix: '+', label: 'Years Experience' },
  { target: 9, suffix: '+', label: 'Completed Projects' },
  { target: 2000, suffix: '+', label: 'Coding Hours' },
  { target: 16, suffix: '+', label: 'Tech Stack' },
];

const Stats = () => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  // With reduced motion the numbers start at their final values, so there's nothing to count up
  const [counts, setCounts] = useState(() =>
    statsData.map((s) => (reduceMotion ? s.target : 0))
  );
  // Set once the count-up lands, which plays a short teal glow on the numbers (Stats.css)
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const duration = 1100;
    const startTime = performance.now();
    let frame;

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(statsData.map((s) => Math.floor(s.target * eased)));
      if (progress < 1) frame = requestAnimationFrame(animate);
      else setFinished(true);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion]);

  return (
    <section className="stats-section" ref={ref}>
      <div className={`stats-container ${finished ? "is-finished" : ""}`}>
        {statsData.map((stat, index) => (
          <div key={stat.label} className="stat-item">
            <span className="stat-value">
              {counts[index]}
              {stat.suffix}
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
