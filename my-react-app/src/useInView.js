import { useEffect, useRef, useState } from "react";

export default function useInView(options = { threshold: 0.3 }, onEnter) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (onEnter) onEnter();
          observer.unobserve(el);
        }
      });
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}
