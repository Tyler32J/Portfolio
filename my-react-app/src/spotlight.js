// How far a project card tilts toward the pointer, in degrees
const MAX_TILT = 7;

// Moves the card's glow to follow the pointer (styled by .project-card::before)
// and tilts the card toward it (styled by .project-card in Projects.css)
export function handleSpotlight(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  card.style.setProperty("--x", `${x}px`);
  card.style.setProperty("--y", `${y}px`);

  if (e.pointerType === "touch") return;
  card.style.setProperty("--ry", `${((x / rect.width) - 0.5) * 2 * MAX_TILT}deg`);
  card.style.setProperty("--rx", `${(0.5 - (y / rect.height)) * 2 * MAX_TILT}deg`);
}

// Lets the card settle back flat when the pointer leaves
export function handleSpotlightLeave(e) {
  e.currentTarget.style.removeProperty("--rx");
  e.currentTarget.style.removeProperty("--ry");
}
