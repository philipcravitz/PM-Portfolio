// src/pages/Home.jsx
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/Hero.png';
import { ProjectContext } from '../ProjectContext';
import ProjectIndexThumb from '../assets/Project-Index.png';
import LinkedInThumb from '../assets/LinkedIn.png';
import ContactThumb from '../assets/Contact-Me.png';
import PhilImage from '../assets/Phil.png';

function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1>Hi, I’m Philip Cravitz</h1>
        <h2>Product Leader | Strategist | Builder of Impactful Experiences</h2>
        <p>
          I design and deliver digital products that connect strategy, technology, and user experience. From transforming
          complex platforms to optimizing workflows and engagement, I craft solutions that drive measurable results and delight users.
        </p>
      </motion.div>
    </section>
  );
}

function Home() {
  const { setProjectTitle } = useContext(ProjectContext);

  useEffect(() => {
    setProjectTitle('Shaping Products, Driving Outcomes');
  }, [setProjectTitle]);

  return (
    <>
      {/* Hero is outside the container so it can span full width */}
      <Hero />

      <main className="container no-top-padding">
        {/* Tile Navigation Section */}
        <section className="home-tiles">
          <div className="tile">
            <img src={ProjectIndexThumb} alt="Featured Projects" className="tile-thumb" />
            <h3>Featured projects</h3>
            <p>
              Explore my portfolio of projects showcasing digital product leadership, UX strategy, and platform innovation.
            </p>
            <Link to="/projects" className="tile-button">
              View projects
            </Link>
          </div>

          <div className="tile">
            <img src={LinkedInThumb} alt="LinkedIn Profile" className="tile-thumb" />
            <h3>LinkedIn profile</h3>
            <p>
              Connect with me on LinkedIn to see my professional network, endorsements, and career highlights.
            </p>
            <a
              href="https://www.linkedin.com/in/philip-cravitz"
              target="_blank"
              rel="noopener noreferrer"
              className="tile-button"
            >
              Connect
            </a>
          </div>

          <div className="tile">
            <img src={ContactThumb} alt="Contact Me" className="tile-thumb" />
            <h3>Contact me</h3>
            <p>
              Have a question or collaboration idea? Reach out via email and I’ll get back to you quickly.
            </p>
            <a href="#contact" className="tile-button">
              Get in touch
            </a>
          </div>
        </section>

{/* About Me Section */}
<section className="about-me-split">
  <div className="about-text-block">
    <h2>About Me</h2>
    <p>
      I am a <strong>product leader</strong> thriving at the intersection of <strong>strategy, technology, and design</strong>.
      Across a decade of work, I’ve led complex digital transformations—launching
      <span className="highlight"> mobile-first platforms</span>, integrating
      <span className="highlight"> AI-powered personalization</span>, and optimizing cross-channel experiences for millions of users.
    </p>
    <p>
      I collaborate seamlessly across engineering, marketing, and compliance, uncovering insights, testing boldly,
      and delivering <strong>measurable business outcomes</strong>. My focus is on creating products that are not only effective but intuitive, engaging, and scalable.
    </p>
    <p>
      I am seeking opportunities beyond financial services or mortgage—my skills are highly transferable, and I am a
      <strong> fast, adaptable learner with high emotional intelligence</strong>. I simplify complexity, drive
      <span className="highlight"> cross-functional alignment</span>, and turn ideas into meaningful results.
    </p>
    <p>
      Whether guiding teams, mentoring colleagues, or designing experiences, I focus on outcomes that create
      <strong> impact, engagement, and growth</strong>—making me a versatile and strategic asset for any organization.
    </p>
  </div>

  <div className="about-headshot-wrapper">
    <img src={PhilImage} alt="Philip Cravitz" className="about-headshot" />
    <div className="headshot-border"></div>
  </div>
</section>

{/* Testimonials Section */}
<section
  className="testimonials"
  style={{
    backgroundColor: '#ffffff',
    padding: '4rem 1rem',
    textAlign: 'center',
  }}
>
  <h2
    style={{
      color: '#1a3e7a',
      marginBottom: '2rem',
      fontSize: '1.75rem',
      fontWeight: '600',
    }}
  >
    What people say
  </h2>

  <div
    style={{
      display: 'grid',
      gap: '1.5rem',
      gridTemplateColumns: '1fr',
      maxWidth: '900px',
      margin: '0 auto',
    }}
  >
    {/* Testimonial 1 */}
    <blockquote
      style={{
        backgroundColor: '#f5f7fa',
        borderLeft: '4px solid #1a3e7a',
        padding: '1.5rem 2rem',
        borderRadius: '8px',
        fontStyle: 'italic',
        lineHeight: '1.6',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
      <p>
        He brought clarity to complex review processes and helped me think more strategically..”
      </p>
      <footer
        style={{
          marginTop: '1rem',
          textAlign: 'right',
          fontWeight: '500',
          color: '#555',
        }}
      >
        — Natalie Brown, September 2025
      </footer>
    </blockquote>

    {/* Example of adding more testimonials */}
    <blockquote
      style={{
        backgroundColor: '#f5f7fa',
        borderLeft: '4px solid #1a3e7a',
        padding: '1.5rem 2rem',
        borderRadius: '8px',
        fontStyle: 'italic',
        lineHeight: '1.6',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
      <p>
        “Phil is incredibly knowledgeable, an outstanding communicator, and one of the most versatile and intelligent people I’ve ever worked with. He was an asset to my team in so many ways, and will bring tremendous value wherever he goes next.”
      </p>
      <footer
        style={{
          marginTop: '1rem',
          textAlign: 'right',
          fontWeight: '500',
          color: '#555',
        }}
      >
        — Nathan Moore, July 2025
      </footer>
    </blockquote>
  </div>
</section>

      </main>
    </>
  );
}

export default Home;