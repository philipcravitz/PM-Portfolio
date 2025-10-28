import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './ProjectContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Project from './pages/Project';
import ProjectsIndex from './pages/ProjectsIndex';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <div className="AppWrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <div className="AppContent" style={{ flex: 1 }}>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsIndex />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
              </Routes>
            </main>
          </div>
          <Footer /> {/* universal footer on all pages */}
        </div>
      </BrowserRouter>
    </ProjectProvider>
  );
}

// Dynamically set main padding based on header height
function adjustMainPadding() {
  const header = document.querySelector('.site-header');
  const main = document.querySelector('main');
  if (header && main) {
    const headerHeight = header.offsetHeight;
    main.style.paddingTop = `${headerHeight}px`;
  }
}

window.addEventListener('load', adjustMainPadding);
window.addEventListener('resize', adjustMainPadding);

export default App;
