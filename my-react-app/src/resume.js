export const RESUME_URL = "/assets/resume.pdf";

// The in-page résumé preview is for computers: a mouse and a wide screen.
// Phones and tablets get the PDF itself, since in-page PDF viewing is unreliable there.
export function canPreviewResume() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches && window.innerWidth >= 768;
}

// Click handler for résumé links: opens the in-page preview (ResumePreview.jsx) when it can, otherwise follows the link
export function openResume(e) {
  if (!canPreviewResume()) return;
  e.preventDefault();
  window.dispatchEvent(new Event("open-resume"));
}
