import React, { useState, useEffect } from "react";
import "./Certifications.css";
import SeeMoreButton from "./SeeMoreButton";
import useInView from "./useInView";


const certifications = [
  {
    id: "cert1",
    status: "Completed",
    statusClass: "completed",
    // statusClass: "in-progress",
    title: "Full Stack Development",
    date: "Graduated 2026",
    year: "2026",
    issuer: "Base Camp Coding Academy",
    description:
      "Comprehensive full-stack web development program covering React, Python, Django, and modern web technologies.",
    certImg:
      "/certifications/full_stack_development_certification.png",
  },
  {
    id: "cert2",
    status: "Completed",
    statusClass: "completed",
    title: "Associates Degree of Arts",
    date: "Graduated 2024",
    year: "2024",
    issuer: "Mississippi Gulf Coast Community College",
    description:
      "Associate degree of Arts emphasizing essential general‑education studies and versatile skills for academic and professional growth.",
    certImg:
     "/certifications/associate_of_arts.png",
  },
  {
    id: "cert3",
    status: "Completed",
    statusClass: "completed",
    title: "Welding and Cutting Technology",
    date: "Graduated 2020",
    year: "2020",
    issuer: " Pearl River Community College",
    description:
      " Gained hands‑on experience in Arc, MIG, TIG, Stick, and flux‑core welding, along with pipe welding and plasma cutting.",
    certImg:
      "/certifications/welding_cutting_technical_certificate.png",
  },
];

export default function Certifications() {
  const [openModal, setOpenModal] = useState(null);
  const [gridRef, inView] = useInView({ threshold: 0.2 });

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpenModal(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <div className="section-header">
          <h2>Certifications & Education</h2>
          <p>Professional credentials and achievements!</p>
        </div>
        <div className="see-more-container">
          <SeeMoreButton href="/certifications" />
        </div>
        <div className="certifications-grid" ref={gridRef}>
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`cert-reveal ${inView ? "in" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="cert-card"
                onClick={() => setOpenModal(cert.id)}
                tabIndex={0}
                role="button"
                aria-label={`View ${cert.title} certificate`}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") setOpenModal(cert.id);
                }}
              >
                <div className="cert-rail">
                  <span className="timeline-dot"></span>
                  <span className="timeline-line"></span>
                  <span className="timeline-year">{cert.year}</span>
                  <span className="timeline-dot"></span>
                </div>
                <div className="cert-content">
                  <div className="cert-header">
                    <span className={`cert-status ${cert.statusClass}`}>
                      {cert.status}
                    </span>
                  </div>
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-description">{cert.description}</p>
                  <div className="view-cert-hint">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>Click to view certificate</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {certifications.map((cert) =>
        openModal === cert.id ? (
          <div
            key={cert.id}
            className="cert-modal active"
            onClick={(e) => {
              if (e.target.classList.contains("cert-modal")) setOpenModal(null);
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">{cert.title}</h3>
                  <p className="modal-subtitle">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
                <button
                  className="close-btn"
                  onClick={() => setOpenModal(null)}
                  aria-label="Close modal"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="modal-body">
                <div className="certificate-display">
                  <img src={cert.certImg} alt="Certificate" />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-close"
                  onClick={() => setOpenModal(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null
      )}
    </section>
  );
}