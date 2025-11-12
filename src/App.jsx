import React from 'react';
import './app.css';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ProjectProvider } from './ProjectContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Project from './pages/Project';
import ProjectsIndex from './pages/ProjectsIndex';
import ProjectDetail from './pages/ProjectDetail';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';

function AppRoutes() {
  const location = useLocation();
  const isBlogDetail = location.pathname.startsWith('/blog/');
  const isBlogList = location.pathname === '/blog';

  return (
    <>
      <Header
        hideTitle={isBlogDetail}
        title={isBlogList ? 'Dispatches from a Product Mind' : undefined}
      />
      <div className="AppContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsIndex />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ProjectProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ProjectProvider>
  );
}

export default App;