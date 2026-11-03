import { useEffect, useRef, useState } from "react";

const TILE = 160;

// The same traces as --circuit-pattern in index.css, in one 160px tile
const TRACES = {
  top: "M0 30h40l15 15h45l10-10h50",
  left: "M80 45v35l-15 15H0",
  right: "M160 90h-40l-20 20v50",
  bottom: "M40 160v-25l20-20h40",
};

// Small points of light that travel along the circuit pattern behind the parent element.
// Each signal: which trace it follows, how far across it sits (0–1), its tile row, speed and start offset.
const CircuitSignals = ({ signals }) => {
  const ref = useRef(null);
  const [grid, setGrid] = useState(null);
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;

    const observer = new ResizeObserver(() => {
      setGrid({
        cols: Math.max(1, Math.ceil(parent.clientWidth / TILE)),
        rows: Math.max(1, Math.ceil(parent.clientHeight / TILE)),
      });
    });
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={ref} className="circuit-signals" aria-hidden="true">
      {grid && !reduceMotion && signals.map((signal, i) => {
        const col = Math.min(grid.cols - 1, Math.floor(signal.x * grid.cols));
        const row = Math.min(grid.rows - 1, signal.row);
        const timing = { dur: `${signal.dur}s`, begin: `${signal.delay}s`, repeatCount: "indefinite" };

        return (
          <g key={i} transform={`translate(${col * TILE} ${row * TILE})`}>
            <circle className="circuit-signal" r="2.5">
              <animateMotion {...timing} path={TRACES[signal.trace]} />
              <animate {...timing} attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" />
            </circle>
          </g>
        );
      })}
    </svg>
  );
};

export default CircuitSignals;
