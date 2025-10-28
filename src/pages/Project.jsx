import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import projects from '../data/projects.json';
import { ProjectContext } from '../ProjectContext';

function Project() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  const { setProjectTitle } = useContext(ProjectContext);

  useEffect(() => {
    console.log('Project loaded:', project?.title);
    if (project) {
      setProjectTitle(project.title.split('(')[0].trim());
    }
    return () => setProjectTitle(null);
  }, [project, setProjectTitle]);

  if (!project) {
    return (
      <main className="container">
        <h2>Project not found</h2>
        <Link to="/projects">← Back to Projects</Link>
      </main>
    );
  }

  return (
<main className="project-detail">
  <div className="container">
    <nav className="breadcrumbs">
      <Link to="/projects">Projects</Link>
      <span>›</span>
      <span>{project.title.split('(')[0].trim()}</span>
    </nav>


      <div className="project-header-content">
        <div className="project-meta">
          <span><strong>Company:</strong> {project.company}</span>
          <span><strong>Role:</strong> {project.role}</span>
          <span><strong>Timeline:</strong> {project.timeline}</span>
        </div>
      </div>

      <nav className="project-nav">
        <a href="#summary">Summary</a>
        <a href="#role">My Role</a>
        <a href="#approach">Approach</a>
        <a href="#outcomes">Outcomes</a>
        <a href="#tools">Tools</a>
      </nav>

      <section className={`project-hero ${projects.indexOf(project) % 2 === 1 ? 'reverse' : ''}`}>
        <div className="project-image-wrapper">
          <img
            src={project.images?.[0] || '/images/placeholder.png'}
            alt={project.title}
            className="project-image"
          />
        </div>
        <div className="project-summary">
          <h2 id="summary">Summary</h2>
          <p>{project.summary}</p>

          <h2 id="role">My Role</h2>
          <p>{project.myRole}</p>

          <h2 id="approach">Approach & Key Actions</h2>
          <ul>
            {project.approachActions.map((a, i) => <li key={i}>{a}</li>)}
          </ul>

          <h2 id="outcomes">Outcomes & Impact</h2>
          <ul>
            {project.outcomes.map((o, i) => <li key={i}>{o}</li>)}
          </ul>

          <h2 id="tools">Tools & Platforms</h2>
          <div className="chips">
            {project.tools.map((t, i) => (
              <span key={i} className="skill-chip">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="back-link">
        <Link to="/projects" className="cta-button">← Back to Projects</Link>
      </div>
    </div> {/* ← this closes .container */}
  </main>
);
}

export default Project;
