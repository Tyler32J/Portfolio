import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import BackButton from "./BackButton";
import "./CertificationsPage.css";

const certifications = [
  {
    id: "cert1",
    status: "Completed",
    statusClass: "completed",
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
    title: "Associates Degree of Art",
    date: "Graduated 2024",
    year: "2024",
    issuer: "Mississippi Gulf Coast Community College",
    description:
      "Associate degree of Art emphasizing essential general‑education studies and versatile skills for academic and professional growth.",
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
  {
    id: "cert4",
    status: "Completed",
    statusClass: "completed",
    title: "High School Diploma",
    date: "Graduated 2018",
    year: "2018",
    issuer: " Bay High School",
    description:
      "Completed with a strong foundation in general education and essential academic skills.",
    certImg:
      "/certifications/coming_soon.png",
  },
   {
    id: "cert5",
    status: "Completed",
    statusClass: "completed",
    title: "Forklift Certification",
    date: "Graduated 2020",
    year: "2020",
    issuer: "Yale",
    description:
      "Yale Corporation's Operator Training Program",
    certImg:
      "/certifications/forklife_certification.png",
  },
  {
    id: "cert6",
    status: "Completed",
    statusClass: "completed",
    title: "Claude 101",
    date: "Graduated 2026",
    year: "2026",
    issuer: "Anthropic",
    description:
      "Claude 101 teaches the basics of using the Claude AI",
    certImg:
      "/certifications/claude_101.png",
  },
  {
    id: "cert7",
    status: "Completed",
    statusClass: "completed",
    title: "Claude Code 101",
    date: "Graduated 2026",
    year: "2026",
    issuer: "Anthropic",
    description:
      "Claude Code 101 teaches the basics of using Claude for coding tasks like debugging, generating code, and understanding programming concepts.",
    certImg:
      "/certifications/claude_code_101.png",
  },
  {
    id: "cert8",
    status: "Completed",
    statusClass: "completed",
    title: "Claude Code in Action",
    date: "Graduated 2026",
    year: "2026",
    issuer: "Anthropic",
    description:
      "Claude Code in Action shows how to use Claude AI to solve real coding problems through hands‑on examples and practical workflows.",
    certImg:
      "/certifications/claude_code_in_action.png",
  },
   {
    id: "cert9",
    status: "Completed",
    statusClass: "completed",
    title: "Claude Platform 101",
    date: "Graduated 2026",
    year: "2026",
    issuer: "Anthropic",
    description:
      "Claude Platform 101 introduces the core tools and features of the Claude AI platform and teaches how to use them effectively.",
    certImg:
      "/certifications/claude_platform_101.png",
  },
  {
    id: "cert10",
    status: "Completed",
    statusClass: "completed",
    title: "Introdution to Claude Cowork",
    date: "Graduated 2026",
    year: "2026",
    issuer: "Anthropic",
    description:
      "Introduction to Claude Cowork teaches how to collaborate with Claude AI on tasks like writing, planning, and problem‑solving in a shared workspace.",
    certImg:
      "/certifications/introduction_to_claude_cowork.png",
  },
  {
    id: "cert11",
    status: "Completed",
    statusClass: "completed",
    title: "AI Fluency for Educators",
    date: "Graduated 2026",
    year: "2026",
    issuer: "Anthropic",
    description:
      "AI Fluency for Educators teaches teachers how to confidently use, understand, and integrate AI tools into instruction, planning, and student support.",
    certImg:
      "/certifications/ai_fluency_for_educators.png",
  },
  {
    id: "cert12",
    status: "Completed",
    statusClass: "completed",
    title: "AI Fluency for Students",
    date: "Graduated 2026",
    year: "2026",
    issuer: "Anthropic",
    description:
      "AI Fluency for Students teaches learners how to understand, use, and communicate effectively with modern AI tools in academic and real‑world tasks.",
    certImg:
      "/certifications/ai_fluency_for_students.png",
  },
];

export default function CertificationsPage() {
  const [openModal, setOpenModal] = useState(null);

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
    <div>
      <NavBar />
      <section id="certifications" className="certifications-section">
        <div className="container">
          <div className="section-header">
            <h2>Certifications & Education</h2>
            <p>Professional credentials and achievements</p>
          </div>
          <BackButton to="/" label="Back" />
          {/* See More button removed */}
          <div className="certifications-grid">
            {certifications.map((cert) => (
              <div
                className="cert-card"
                key={cert.id}
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
      <Footer />
    </div>
  );
}