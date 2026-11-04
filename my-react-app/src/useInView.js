import { useEffect, useRef, useState } from "react";

export default function useInView(options = { threshold: 0.3 }, onEnter) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  // Callers pass a new options object and callback on every render; keep the first options
  // (the observer is only set up once) and always call the latest callback.
  // rootMargin grows the root downward: a threshold is a % of the TARGET's own area, and a
  // tall single-column grid (a long mobile card list) can be taller than the viewport itself,
  // so it may never reach even a modest threshold while scrolled to a stop beside it. The
  // extra margin lets that intersection start accumulating before the element is fully on
  // screen, so the reveal still fires reliably without changing what threshold each caller asked for.
  const optionsRef = useRef({ rootMargin: "0px 0px 200px 0px", ...options });
  const onEnterRef = useRef(onEnter);

  useEffect(() => {
    onEnterRef.current = onEnter;
  }, [onEnter]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (onEnterRef.current) onEnterRef.current();
          observer.unobserve(el);
        }
      });
    }, optionsRef.current);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}
