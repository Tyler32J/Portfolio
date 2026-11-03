import { useEffect, useRef, useState } from "react";

export default function useInView(options = { threshold: 0.3 }, onEnter) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  // Callers pass a new options object and callback on every render; keep the first options
  // (the observer is only set up once) and always call the latest callback
  const optionsRef = useRef(options);
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
