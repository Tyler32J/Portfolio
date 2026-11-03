import { useEffect, useRef } from "react";
import CircuitSignals from "./CircuitSignals";
import { modalHeaderSignals, modalFooterSignals } from "./modalSignals";
import TerminalRunner from "./TerminalRunner";
import { TERMINAL_PROGRAMS } from "./terminalPrograms";

// Project popup opened from "View Project". Reuses the certificate popup's look (cert-modal / modal-* classes).
const ProjectDetails = ({ project, onClose }) => {
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const opener = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, []);

  const isCodeOnly = project.link.includes("github.com");
  const terminal = project.play ? TERMINAL_PROGRAMS[project.play] : null;

  return (
    <div
      className="cert-modal active project-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="project-title">
        <div className="modal-header">
          <CircuitSignals signals={modalHeaderSignals} />
          <div>
            <h3 id="project-title" className="modal-title">{project.title.trim()}</h3>
            <p className="modal-subtitle">{project.tech}</p>
          </div>
          <button ref={closeRef} className="close-btn" onClick={onClose} aria-label="Close project details">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* Playable projects run their real code here instead of showing a screenshot */}
          {terminal ? (
            <TerminalRunner
              program={terminal.program}
              title={`${project.title.trim()} · ${terminal.command}`}
              intro={terminal.intro}
              tip={terminal.tip}
              runLabel={terminal.runLabel}
            />
          ) : (
            <img className="project-modal-img" src={project.image} alt={`${project.title.trim()} screenshot`} />
          )}
          <p className="project-modal-text">{project.description.trim()}</p>
        </div>

        <div className="modal-footer">
          <CircuitSignals signals={modalFooterSignals} />
          {terminal ? (
            <>
              <span className="project-modal-note">Runs entirely in your browser. Nothing you type is sent anywhere.</span>
              <button type="button" className="btn btn-close" onClick={onClose}>Close</button>
            </>
          ) : (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="modal-action btn-shine">
              {isCodeOnly ? "View on GitHub" : "Visit live site"}
              <svg className="modal-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
