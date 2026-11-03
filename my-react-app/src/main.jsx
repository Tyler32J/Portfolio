import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Preloader from './Preloader';
import ScrollToTop from './ScrollToTop';
import AnimatedRoutes from './AnimatedRoutes';
import Cursor from './Cursor';
import ResumePreview from './ResumePreview';
import CommandMenu from './CommandMenu';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Preloader />
      <ScrollToTop />
      <AnimatedRoutes />
      <CommandMenu />
    </Router>
    <ResumePreview />
    <Cursor />
  </StrictMode>
);
