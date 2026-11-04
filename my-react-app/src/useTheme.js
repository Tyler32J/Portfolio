import { useCallback, useEffect, useState } from "react";

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return "dark";
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback((event) => {
    const flip = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      flip();
      return;
    }

    // Circular reveal expanding from the click point, via the View Transition API.
    if (document.startViewTransition) {
      let x = event?.clientX;
      let y = event?.clientY;
      // A keyboard-triggered click reports (0, 0); reveal from the button instead.
      if (!x && !y && event?.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
      x = x ?? window.innerWidth / 2;
      y = y ?? window.innerHeight / 2;

      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(flip);
      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: "cubic-bezier(0.65, 0, 0.35, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
      return;
    }

    // Fallback where the View Transition API isn't supported: the plain crossfade
    // (see .theme-switching in index.css).
    const root = document.documentElement;
    root.classList.add("theme-switching");
    clearTimeout(root.themeSwitchTimer);
    root.themeSwitchTimer = setTimeout(() => root.classList.remove("theme-switching"), 500);
    flip();
  }, []);

  return [theme, toggleTheme];
}
