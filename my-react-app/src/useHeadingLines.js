import { useEffect } from "react";

const SELECTOR = ".section-header h2";

// Draws the teal line under each section heading (styled in index.css) the first time it scrolls into view
export default function useHeadingLines() {
  useEffect(() => {
    const intersection = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("line-drawn");
            intersection.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    // Tracked per run (not on the element) so a restarted effect, like React's dev-mode double run, watches them again
    const watched = new WeakSet();
    const watch = (root) => {
      root.querySelectorAll(SELECTOR).forEach((heading) => {
        if (!watched.has(heading) && !heading.classList.contains("line-drawn")) {
          watched.add(heading);
          intersection.observe(heading);
        }
      });
    };

    // Headings can appear later (page changes, the contact form coming back after sending)
    const mutation = new MutationObserver(() => watch(document));
    mutation.observe(document.body, { childList: true, subtree: true });
    watch(document);

    return () => {
      intersection.disconnect();
      mutation.disconnect();
    };
  }, []);
}
