import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import SkillsPage from './SkillsPage';
import CertificationsPage from './CertificationsPage';
import ProjectsPage from './ProjectsPage';
import ContactPage from './ContactPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}  />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/certifications" element={<CertificationsPage />} /> 
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  </StrictMode>
);