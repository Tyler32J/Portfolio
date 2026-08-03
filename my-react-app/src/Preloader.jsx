import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Preloader.css";

const BLUE = "14, 165, 233";
const BLUE_BRIGHT = "56, 189, 248";
const WHITE_HOT = "224, 247, 255";

const CARDINALS = [
  { label: "N", deg: 0, major: true },
  { label: "NE", deg: 45, major: false },
  { label: "E", deg: 90, major: true },
  { label: "SE", deg: 135, major: false },
  { label: "S", deg: 180, major: true },
  { label: "SW", deg: 225, major: false },
  { label: "W", deg: 270, major: true },
  { label: "NW", deg: 315, major: false },
];

function seeded(n, s0) {
  const arr = [];
  let s = s0;
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    arr.push(s / 233280);
  }
  return arr;
}

const STAR_SEEDS = seeded(40, 42);
const SPIKE_SEEDS = seeded(36, 17);

const SIZE = 360;
const SETTLE_MS = 2300;
const SPIN_TURNS = 3.25;
const PLAY_MS = 3400;
const FADE_MS = 900;

const ACQUIRING_TEXT = "ACQUIRING SIGNAL";
const LOCKED_TEXT = "SIGNAL LOCKED";

function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

const Preloader = () => {
  const canvasRef = useRef(null);
  const statusRef = useRef(null);
  const percentRef = useRef(null);
  const [dismissed, setDismissed] = useState(false);
  const [removed, setRemoved] = useState(false);
  const navigate = useNavigate();
  const hasCheckedInitialRoute = useRef(false);

  useEffect(() => {
    if (hasCheckedInitialRoute.current) return;
    hasCheckedInitialRoute.current = true;
    if (window.location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function drawStars(t) {
      for (let i = 0; i < STAR_SEEDS.length; i++) {
        const a = STAR_SEEDS[i] * Math.PI * 2;
        const r = 70 + (i % 7) * 12;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        const twinkle = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t / 900 + i * 1.7));
        ctx.fillStyle = `rgba(${BLUE_BRIGHT}, ${twinkle})`;
        ctx.beginPath();
        ctx.arc(x, y, 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawOuterBezel(angle) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = `rgba(${BLUE}, 0.4)`;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = `rgba(${BLUE}, 0.5)`;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(0, 0, 174, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    function drawOuterFrame(angle) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const R = 138;
      ctx.strokeStyle = `rgba(${BLUE}, 0.55)`;
      ctx.lineWidth = 1.4;
      ctx.shadowColor = `rgba(${BLUE}, 0.6)`;
      ctx.shadowBlur = 6;

      const notchHalf = 0.16;
      for (let k = 0; k < 4; k++) {
        const base = (Math.PI / 2) * k;
        ctx.beginPath();
        ctx.arc(0, 0, R, base + notchHalf, base + Math.PI / 2 - notchHalf);
        ctx.stroke();

        const tabAngle = base;
        const inX = Math.cos(tabAngle) * (R - 6);
        const inY = Math.sin(tabAngle) * (R - 6);
        const outX = Math.cos(tabAngle) * (R + 10);
        const outY = Math.sin(tabAngle) * (R + 10);
        const perpX = Math.cos(tabAngle + Math.PI / 2);
        const perpY = Math.sin(tabAngle + Math.PI / 2);
        const w = 9;
        ctx.beginPath();
        ctx.moveTo(inX + perpX * w, inY + perpY * w);
        ctx.lineTo(outX + perpX * w * 0.6, outY + perpY * w * 0.6);
        ctx.lineTo(outX - perpX * w * 0.6, outY - perpY * w * 0.6);
        ctx.lineTo(inX - perpX * w, inY - perpY * w);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawDashedRing(angle) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = `rgba(${BLUE_BRIGHT}, 0.8)`;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = `rgba(${BLUE_BRIGHT}, 0.8)`;
      ctx.shadowBlur = 8;
      ctx.setLineDash([9, 7]);
      ctx.beginPath();
      ctx.arc(0, 0, 130, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    function drawGaugeRing(angle) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const count = 48;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const major = i % 4 === 0;
        const r1 = 124;
        const r2 = major ? 114 : 119;
        ctx.strokeStyle = major ? `rgba(${WHITE_HOT}, 0.85)` : `rgba(${BLUE}, 0.45)`;
        ctx.lineWidth = major ? 1.6 : 1;
        ctx.shadowBlur = major ? 5 : 0;
        ctx.shadowColor = `rgba(${WHITE_HOT}, 0.7)`;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawTriangles(angle) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.fillStyle = `rgba(${BLUE_BRIGHT}, 0.9)`;
      ctx.shadowColor = `rgba(${BLUE_BRIGHT}, 0.8)`;
      ctx.shadowBlur = 6;
      [0.9, 2.8, 4.7].forEach((a) => {
        const r = 122;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        const s = 6;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(a) * s, y + Math.sin(a) * s);
        ctx.lineTo(x + Math.cos(a + 2.2) * s, y + Math.sin(a + 2.2) * s);
        ctx.lineTo(x + Math.cos(a - 2.2) * s, y + Math.sin(a - 2.2) * s);
        ctx.closePath();
        ctx.fill();
      });
      ctx.restore();
    }

    function drawSpikes(angle, t) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const count = SPIKE_SEEDS.length;
      const spanStart = Math.PI * 0.55;
      const spanEnd = Math.PI * 1.45;
      for (let i = 0; i < count; i++) {
        const a = spanStart + ((spanEnd - spanStart) * i) / count;
        const wobble = 0.5 + 0.5 * Math.sin(t / 260 + SPIKE_SEEDS[i] * 12);
        const len = 8 + SPIKE_SEEDS[i] * 22 * (reduceMotion ? 1 : 0.6 + 0.4 * wobble);
        const r1 = 139;
        ctx.strokeStyle = `rgba(${BLUE_BRIGHT}, ${0.3 + 0.35 * wobble})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        ctx.lineTo(Math.cos(a) * (r1 + len), Math.sin(a) * (r1 + len));
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawTopIndex(locked) {
      ctx.save();
      ctx.translate(cx, cy);
      const glow = locked ? 12 : 6;
      ctx.fillStyle = locked ? `rgba(${WHITE_HOT}, 1)` : `rgba(${BLUE_BRIGHT}, 0.9)`;
      ctx.shadowColor = `rgba(${WHITE_HOT}, 0.9)`;
      ctx.shadowBlur = glow;
      ctx.beginPath();
      ctx.moveTo(0, -136);
      ctx.lineTo(-6, -122);
      ctx.lineTo(6, -122);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = `rgba(${BLUE}, 0.5)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -118);
      ctx.lineTo(0, -96);
      ctx.stroke();
      ctx.restore();
    }

    function drawCompassCard(angle) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      for (let d = 0; d < 360; d += 5) {
        const a = (d * Math.PI) / 180 - Math.PI / 2;
        const isMajor = d % 30 === 0;
        const r1 = 112;
        const r2 = isMajor ? 100 : 106;
        ctx.strokeStyle = isMajor ? `rgba(${WHITE_HOT}, 0.85)` : `rgba(${BLUE}, 0.45)`;
        ctx.lineWidth = isMajor ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
        ctx.stroke();
      }

      CARDINALS.forEach((c) => {
        const a = (c.deg * Math.PI) / 180 - Math.PI / 2;
        const len = c.major ? 82 : 58;
        ctx.strokeStyle = c.major ? `rgba(${BLUE_BRIGHT}, 0.55)` : `rgba(${BLUE}, 0.3)`;
        ctx.lineWidth = c.major ? 1.4 : 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * len, Math.sin(a) * len);
        ctx.stroke();
      });

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      CARDINALS.forEach((c) => {
        const a = (c.deg * Math.PI) / 180 - Math.PI / 2;
        const r = 82;
        ctx.save();
        ctx.translate(Math.cos(a) * r, Math.sin(a) * r);
        ctx.rotate(-angle);
        ctx.font = c.major ? "700 12px system-ui, sans-serif" : "600 8px system-ui, sans-serif";
        ctx.fillStyle =
          c.label === "N" ? `rgba(${WHITE_HOT}, 1)` : c.major ? `rgba(${BLUE_BRIGHT}, 0.9)` : `rgba(${BLUE}, 0.6)`;
        ctx.shadowColor = `rgba(${BLUE_BRIGHT}, 0.7)`;
        ctx.shadowBlur = c.label === "N" ? 8 : 3;
        ctx.fillText(c.label, 0, 0);
        ctx.restore();
      });

      ctx.restore();
    }

    function drawNeedle(angle, locked) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -46);
      ctx.lineTo(-4.5, 0);
      ctx.lineTo(4.5, 0);
      ctx.closePath();
      ctx.fillStyle = locked ? `rgba(${WHITE_HOT}, 1)` : `rgba(${BLUE_BRIGHT}, 0.95)`;
      ctx.shadowColor = `rgba(${WHITE_HOT}, 0.9)`;
      ctx.shadowBlur = locked ? 10 : 6;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, 34);
      ctx.lineTo(-3.5, 0);
      ctx.lineTo(3.5, 0);
      ctx.closePath();
      ctx.fillStyle = `rgba(${BLUE}, 0.55)`;
      ctx.shadowBlur = 0;
      ctx.fill();
      ctx.restore();
    }

    function drawCore(t) {
      const pulse = 0.5 + 0.5 * Math.sin(t / 500);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = `rgba(${WHITE_HOT}, 1)`;
      ctx.shadowColor = `rgba(${BLUE_BRIGHT}, 0.9)`;
      ctx.shadowBlur = 8 + pulse * 6;
      ctx.beginPath();
      ctx.arc(0, 0, 3 + pulse * 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function headingAngle(t) {
      const progress = Math.min(t / SETTLE_MS, 1);
      const eased = easeOutElastic(progress);
      const startAngle = -SPIN_TURNS * Math.PI * 2;
      return startAngle * (1 - eased);
    }

    let start = null;
    let stopped = false;
    let lockedAnnounced = false;
    let rafId = null;

    function frame(now) {
      if (start === null) start = now;
      const t = now - start;
      ctx.clearRect(0, 0, SIZE, SIZE);

      const speed = reduceMotion ? 0 : 1;
      drawStars(t);
      drawOuterBezel((t / 12000) * Math.PI * 2 * speed);
      drawOuterFrame((t / 9000) * Math.PI * 2 * speed);
      drawDashedRing((-t / 5200) * Math.PI * 2 * speed);
      drawGaugeRing((t / 6600) * Math.PI * 2 * speed);
      drawTriangles((t / 6600) * Math.PI * 2 * speed);

      const angle = reduceMotion ? 0 : headingAngle(t);
      const locked = t >= SETTLE_MS;

      drawCompassCard(angle);
      drawNeedle(angle, locked);
      drawTopIndex(locked);
      drawCore(t);
      drawSpikes((-t / 15000) * Math.PI * 2 * speed, t);

      const normDeg = ((-angle * 180) / Math.PI) % 360;
      const displayDeg = Math.round(((normDeg % 360) + 360) % 360);
      if (percentRef.current) {
        percentRef.current.textContent = locked
          ? "HDG 000° · LOCKED"
          : "HDG " + String(displayDeg).padStart(3, "0") + "°";
      }
      if (locked && !lockedAnnounced) {
        lockedAnnounced = true;
        if (statusRef.current) statusRef.current.textContent = LOCKED_TEXT;
      }

      if (!stopped) rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    const dismissTimer = setTimeout(() => {
      stopped = true;
      setDismissed(true);
    }, PLAY_MS);
    const removeTimer = setTimeout(() => setRemoved(true), PLAY_MS + FADE_MS);

    return () => {
      stopped = true;
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(dismissTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`preloader-overlay${dismissed ? " dismissed" : ""}`}>
      <canvas ref={canvasRef} className="preloader-canvas" />
      <div className="preloader-status">
        <span ref={statusRef}>{ACQUIRING_TEXT}</span>
        <span className="preloader-cursor" />
      </div>
      <div ref={percentRef} className="preloader-percent">
        HDG ---&deg;
      </div>
    </div>
  );
};

export default Preloader;
