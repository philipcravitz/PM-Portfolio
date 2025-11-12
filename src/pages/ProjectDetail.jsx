// src/pages/ProjectDetail.jsx
import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import projects from "../data/projects.json";
import { ProjectContext } from "../ProjectContext";

// Vite-friendly image imports
const imageMap = {
  "home-page-redesign": {
    main: new URL("../assets/WF-Home.png", import.meta.url).href,
    thumb: new URL("../assets/WF-Home_Thumb.png", import.meta.url).href,
  },
  "mortgage-digital-transformation": {
    main: new URL("../assets/ProjectProposal.png", import.meta.url).href,
    thumb: new URL("../assets/ProjectProposal_Thumb.png", import.meta.url).href,
  },
  "lead-form-redesign": {
    main: new URL("../assets/LeadForm-ValueX.png", import.meta.url).href,
    thumb: new URL("../assets/LeadForm-ValueX_Thumb.png", import.meta.url).href,
    extra: [
      new URL("../assets/LeadForm-Phases.png", import.meta.url).href,
      new URL("../assets/LeadForm-Principles.png", import.meta.url).href,
      new URL("../assets/LeadForm-Design.png", import.meta.url).href,
    ],
  },
  "learning-center": {
    main: new URL("../assets/LearningCenter.png", import.meta.url).href,
    thumb: new URL("../assets/LearningCenter_Thumb.png", import.meta.url).href,
  },
  "servicing-0-to-1": {
    main: new URL("../assets/PennyMac-Servicing.png", import.meta.url).href,
    thumb: new URL("../assets/PennyMac-Servicing_Thumb.png", import.meta.url).href,
  },
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const { setProjectTitle } = useContext(ProjectContext);
  const [modalIndex, setModalIndex] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    setProjectTitle(project?.title || "");
    window.scrollTo(0, 0);

    if (project) {
      const images = [imageMap[project.slug]?.main || ""].concat(
        imageMap[project.slug]?.extra || []
      );
      setGalleryImages(images);
    }
  }, [project, setProjectTitle]);

  if (!project) return <div>Project not found.</div>;

  const hasHero = !!imageMap[project.slug]?.main;
  const hasSecondary = !!imageMap[project.slug]?.extra?.length;

  const handleNext = () => setModalIndex((prev) => (prev + 1) % galleryImages.length);
  const handlePrev = () =>
    setModalIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  const handleClose = () => setModalIndex(null);

  return (
    <main className="project-detail-container">
      {/* My Role + Hero */}
      <div style={{ height: '100px', flexShrink: 0 }}></div> {/* Spacer to clear header */}
      <section className="project-section hero-two-column">
        <div className="project-content">
          <h2>Summary</h2>
          <p>{project.summaryDetail || project.summary}</p>

          <h2>My Role</h2>
          <p>{project.myRole}</p>
        </div>
        {hasHero && (
          <div className="hero-image-wrapper">
            <img
              src={imageMap[project.slug].main}
              alt={project.title}
              onClick={() => setModalIndex(0)}
            />
          </div>
        )}
      </section>

      {/* Approach & Key Actions + Secondary Images */}
      <section className="project-section secondary-two-column">
        <div className="project-content">
          <h2>Approach & Key Actions</h2>
          <ul>
            {project.approachActions.map((action, i) => (
              <li key={i}>{action}</li>
            ))}
          </ul>

          <h2>Outcomes & Impact</h2>
          <ul>
            {project.outcomes.map((outcome, i) => (
              <li key={i}>{outcome}</li>
            ))}
          </ul>

          <h2>Tools & Platforms</h2>
          <div className="chips">
            {project.tools.map((tool, i) => (
              <span key={i} className="skill-chip">{tool}</span>
            ))}
          </div>
        </div>

        {hasSecondary && (
          <div className="secondary-images-wrapper">
            {imageMap[project.slug].extra.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Project screenshot ${idx + 1}`}
                onClick={() => setModalIndex(idx + 1)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Impact Areas */}
      <section className="project-section full-width-text">
        <h2>Impact Areas</h2>
        <ul>
          {project.impactAreas.map((area, i) => (
            <li key={i}>{area}</li>
          ))}
        </ul>
      </section>

      {/* Modal Gallery */}
      {modalIndex !== null && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose}>×</button>
            <button className="modal-prev" onClick={handlePrev}>‹</button>
            <img src={galleryImages[modalIndex]} alt="Project" className="modal-image" />
            <button className="modal-next" onClick={handleNext}>›</button>
          </div>
        </div>
      )}
    </main>
  );
}
