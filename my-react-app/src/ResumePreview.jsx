import { useEffect, useRef, useState } from "react";
import CircuitSignals from "./CircuitSignals";
import { RESUME_URL } from "./resume";
import { modalHeaderSignals as headerSignals, modalFooterSignals as footerSignals } from "./modalSignals";

// pdf.js is ~600KB; only visitors who actually open the résumé should pay for it, so it's
// loaded on demand (below) instead of imported up top with everything else.
let pdfjsLibPromise = null;
function loadPdfjs() {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = Promise.all([
      import("pdfjs-dist"),
      import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
    ]).then(([pdfjsLib, worker]) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
      return pdfjsLib;
    });
  }
  return pdfjsLibPromise;
}

// Résumé popup, opened by openResume() in resume.js. Reuses the certificate popup's look
// (cert-modal / modal-* classes) so both popups match.
const ResumePreview = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const closeRef = useRef(null);
  const canvasHostRef = useRef(null);

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

  // Render the PDF onto <canvas> elements ourselves instead of leaving it to an <iframe>:
  // a browser's built-in PDF viewer is unreliable embedded in a page (some browser
  // settings or extensions just silently download the file and leave the frame blank),
  // so pdf.js gives the same result for every visitor.
  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setStatus("loading");
    const host = canvasHostRef.current;
    if (host) host.innerHTML = "";

    loadPdfjs()
      .then((pdfjsLib) => pdfjsLib.getDocument(RESUME_URL).promise)
      .then(async (pdf) => {
        if (cancelled || !host) return;
        const containerWidth = host.clientWidth || 760;
        const pixelRatio = window.devicePixelRatio || 1;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNum);
          const unscaledViewport = page.getViewport({ scale: 1 });
          const scale = (containerWidth / unscaledViewport.width) * pixelRatio;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.className = "resume-page";
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.aspectRatio = `${unscaledViewport.width} / ${unscaledViewport.height}`;
          if (cancelled || !host) return;
          host.appendChild(canvas);

          const ctx = canvas.getContext("2d");
          await page.render({ canvasContext: ctx, viewport }).promise;
        }

        if (!cancelled) setStatus("ready");
      })
      .catch((err) => {
        console.error("Résumé preview failed to render", err);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
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
          <div className="resume-frame">
            {/* pdf.js owns every child of this div directly (see the effect above); React
                never renders anything into it, so the two never fight over its contents */}
            <div className="resume-canvases" ref={canvasHostRef} />
            {status === "loading" && <p className="resume-status">Loading résumé…</p>}
            {status === "error" && (
              <p className="resume-status">
                Couldn't load the preview.{" "}
                <a href={RESUME_URL} target="_blank" rel="noreferrer">
                  Open the PDF directly
                </a>{" "}
                instead.
              </p>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <CircuitSignals signals={footerSignals} />
          <a href={RESUME_URL} download="Tyler-Farrell-Resume.pdf" className="resume-download btn-shine">
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
