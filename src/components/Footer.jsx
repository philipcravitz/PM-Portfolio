// src/components/Footer.jsx
import React from "react";
import LinkedInThumb from "../assets/LinkedIn.png";
import ContactThumb from "../assets/Contact-Me.png";

function Footer() {
  return (
    <footer id="contact" className="footer-section">
      <div className="contact-content">
        <div className="contact-text">
          <h4 className="footer-h4">Connect</h4>
          <h2 className="footer-h2">Let's talk</h2>
          <p className="footer-p">
            I want to drive your product initiatives forward.
          </p>
        </div>

        <div className="contact-links">
          <a href="mailto:philip.cravitz@gmail.com" className="contact-link">
            <img src={ContactThumb} alt="Email" className="contact-icon" />
            philip.cravitz@gmail.com
          </a>

          <a
            href="https://www.linkedin.com/in/philip-cravitz"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <img src={LinkedInThumb} alt="LinkedIn" className="contact-icon" />
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
