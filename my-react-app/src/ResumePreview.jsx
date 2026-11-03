import { useEffect, useRef, useState } from "react";
import CircuitSignals from "./CircuitSignals";
import { RESUME_URL } from "./resume";
import { modalHeaderSignals as headerSignals, modalFooterSignals as footerSignals } from "./modalSignals";

// Résumé popup, opened by openResume() in resume.js. Reuses the certificate popup's look
// (cert-modal / modal-* classes) so both popups match.
const ResumePreview = () => {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("open-resume", show);
    return () => window.removeEventListener("open-resume", show);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="cert-modal active resume-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="resume-title">
        <div className="modal-header">
          <CircuitSignals signals={headerSignals} />
          <div>
            <h3 id="resume-title" className="modal-title">Résumé</h3>
            <p className="modal-subtitle">Tyler Farrell • PDF</p>
          </div>
          <button
            ref={closeRef}
            className="close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close résumé"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <iframe className="resume-frame" src={`${RESUME_URL}#view=FitH`} title="Tyler Farrell's résumé" />
        </div>

        <div className="modal-footer">
          <CircuitSignals signals={footerSignals} />
          <a href={RESUME_URL} target="_blank" rel="noreferrer" className="resume-open-link">
            Open in new tab
          </a>
          <a href={RESUME_URL} download="Tyler-Farrell-Resume.pdf" className="resume-download btn-shine">
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
