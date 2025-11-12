// src/pages/ProjectsIndex.jsx
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard.jsx';
import projects from '../data/projects.json';
import { ProjectContext } from '../ProjectContext';

// Import your new icons
import DigitalTransformation from '../assets/digital-transformation3.png';
import HomePageRedesign from '../assets/home-page-redesign.png';
import LeadForm from '../assets/lead-form.png';
import LearningCenter from '../assets/learning-center.png';
import ServicingPlatform from '../assets/servicing-platform2.png';

function ProjectsIndex() {
  const { setProjectTitle } = useContext(ProjectContext);

  useEffect(() => {
    setProjectTitle('Featured Projects');
    window.scrollTo(0, 0);
    return () => setProjectTitle(null);
  }, [setProjectTitle]);

  // Map icons to projects
  const projectIcons = [
    DigitalTransformation,
    HomePageRedesign,
    LeadForm,
    LearningCenter,
    ServicingPlatform,
  ];

  return (
    <main className="container" style={{ padding: '120px 1rem 2rem' }}>
      <section id="projects-list" className="projects-grid">
        {projects.map((proj, index) => (
          <div key={proj.slug} className="project-card">
            <div className="icon-title-row">
              {projectIcons[index] && (
                <img
                  src={projectIcons[index]}
                  alt={`${proj.title} icon`}
                  className="project-icon"
                />
              )}
              <h3 className="project-title">{proj.title}</h3>
            </div>
            <p className="project-summary">{proj.summary}</p>
            {proj.highlights && (
              <ul className="project-highlights">
                {proj.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            )}
            {/* CTA Button */}
            <Link to={`/projects/${proj.slug}`} className="project-cta-button">
              View Project Details
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}

export default ProjectsIndex;
