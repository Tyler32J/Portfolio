import { useEffect, useRef, useState } from "react";

const CLICKABLE = "a, button, [role='button'], label, summary, select";
// The teal cursor hides over these: text fields keep the typing cursor, and embedded pages (the résumé PDF) use their own
const TEXT_FIELD = "input, textarea, [contenteditable='true'], iframe";

// Teal cursor for mouse users: a dot that follows exactly and a ring that trails just behind it.
// Styled in index.css. Phones and touch screens keep their normal behavior.
const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled] = useState(
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = null;

    root.classList.add("has-custom-cursor");

    const moveRing = () => {
      const ease = reduceMotion ? 1 : 0.2;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      const settled = Math.abs(mouseX - ringX) + Math.abs(mouseY - ringY) < 0.1;
      frame = settled ? null : requestAnimationFrame(moveRing);
    };

    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!root.classList.contains("cursor-visible")) {
        ringX = mouseX;
        ringY = mouseY;
        root.classList.add("cursor-visible");
      }

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      const target = e.target instanceof Element ? e.target : null;
      root.classList.toggle("cursor-over-text", Boolean(target?.closest(TEXT_FIELD)));
      ring.classList.toggle("is-hot", Boolean(target?.closest(CLICKABLE)));

      if (!frame) frame = requestAnimationFrame(moveRing);
    };

    const onLeave = () => root.classList.remove("cursor-visible");
    const onDown = () => ring.classList.add("is-pressed");
    const onUp = () => ring.classList.remove("is-pressed");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor", "cursor-visible", "cursor-over-text");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

export default Cursor;
