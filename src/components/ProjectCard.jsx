import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ slug = '', title = '', summary = '', highlights = [], images = [], index = 0 }) {
  const thumbnail = images[0] || '/images/placeholder.png';
  const isEven = index % 2 === 0; // even index => image on left

  return (
    <div className={`project-card ${isEven ? 'image-left' : 'image-right'}`}>
      <img src={thumbnail} alt={title} className="project-thumb" />
      <div className="project-info">
        {slug ? (
          <Link to={`/projects/${slug}`} className="project-title-link">
            <h3>{title}</h3>
          </Link>
        ) : (
          <h3>{title}</h3>
        )}
        {summary && <p>{summary}</p>}
        {highlights.length > 0 && (
          <ul className="project-highlights">
            {highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
