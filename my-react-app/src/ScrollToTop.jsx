import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map();

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") {
      const saved = scrollPositions.get(location.key);
      window.scrollTo({ top: saved || 0, left: 0, behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location, navigationType]);

  useEffect(() => {
    const saveScroll = () => scrollPositions.set(location.key, window.scrollY);
    window.addEventListener("scroll", saveScroll);
    return () => {
      window.removeEventListener("scroll", saveScroll);
    };
  }, [location]);

  return null;
};

export default ScrollToTop;
