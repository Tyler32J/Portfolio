import { Routes, Route, useLocation } from 'react-router-dom';
import App from './App.jsx';
import SkillsPage from './SkillsPage';
import CertificationsPage from './CertificationsPage';
import ProjectsPage from './ProjectsPage';
import ContactPage from './ContactPage';
import NotFound from './NotFound';
import useHeadingLines from './useHeadingLines';

// Keyed by path so each page fades in when you navigate to it
const AnimatedRoutes = () => {
  const location = useLocation();
  useHeadingLines();

  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<App />}  />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AnimatedRoutes;
