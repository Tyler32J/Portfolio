// Signals for popup headers and footers (CircuitSignals.jsx), so popups share the navbar and footer's circuit look
export const modalHeaderSignals = [
  { trace: "top", x: 0.1, row: 0, dur: 4.5, delay: 0 },
  { trace: "top", x: 0.55, row: 0, dur: 5.5, delay: -2 },
  { trace: "top", x: 0.85, row: 0, dur: 5, delay: -3.5 },
];

export const modalFooterSignals = [
  { trace: "top", x: 0.25, row: 0, dur: 5, delay: -1 },
  { trace: "top", x: 0.7, row: 0, dur: 4.5, delay: -2.8 },
];
