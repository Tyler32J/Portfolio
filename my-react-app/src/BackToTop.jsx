import { useEffect, useRef, useState } from "react";
import "./BackToTop.css";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);

      // The ring around the button fills as you scroll (set directly so scrolling doesn't re-render)
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (progressRef.current) progressRef.current.style.strokeDashoffset = `${100 - progress * 100}`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg className="back-to-top-ring" viewBox="0 0 52 52" aria-hidden="true">
        <circle className="back-to-top-track" cx="26" cy="26" r="24" />
        <circle ref={progressRef} className="back-to-top-progress" cx="26" cy="26" r="24" pathLength="100" />
      </svg>
      <svg className="back-to-top-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
};

export default BackToTop;
