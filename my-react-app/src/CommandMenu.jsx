import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RESUME_URL, canPreviewResume } from "./resume";
import "./CommandMenu.css";

// Drawn icons (text symbols like ✉ or ↗ turn into colorful emoji on Windows)
const icon = (d) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const ICONS = {
  home: icon(<><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /></>),
  skills: icon(<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" />),
  projects: icon(<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 21h8M12 18v3" /></>),
  certifications: icon(<><circle cx="12" cy="9" r="5" /><path d="m9 13.5-1.5 7.5L12 18.5l4.5 2.5-1.5-7.5" /></>),
  contact: icon(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>),
  resume: icon(<><path d="M14 3H6v18h12V7z" /><path d="M14 3v4h4M9 13h6M9 17h6" /></>),
  theme: icon(<><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" /></>),
  link: icon(<path d="M7 17 17 7M8 7h9v9" />),
};

// Opens the résumé popup on computers, or the PDF itself on phones (same rule as resume.js)
const openResumeAnywhere = () => {
  if (canPreviewResume()) {
    window.dispatchEvent(new Event("open-resume"));
  } else {
    window.open(RESUME_URL, "_blank", "noopener");
  }
};

// Clicks whichever theme toggle is visible, so the navbar's icon stays in sync
const toggleTheme = () => {
  const toggle = [...document.querySelectorAll(".theme-toggle-btn")].find((el) => el.offsetParent !== null);
  toggle?.click();
};

// Ctrl+K / Cmd+K quick menu. Also opened by the navbar's search button ("open-command-menu" event).
const CommandMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const items = useMemo(() => [
    { icon: ICONS.home, label: "Home", group: "Page", run: () => navigate("/") },
    { icon: ICONS.skills, label: "Skills", group: "Page", run: () => navigate("/skills") },
    { icon: ICONS.projects, label: "Projects", group: "Page", run: () => navigate("/projects") },
    { icon: ICONS.certifications, label: "Certifications", group: "Page", run: () => navigate("/certifications") },
    { icon: ICONS.contact, label: "Contact", group: "Page", run: () => navigate("/contact") },
    { icon: ICONS.resume, label: "Open résumé", group: "Action", run: openResumeAnywhere },
    { icon: ICONS.theme, label: "Switch light / dark", group: "Action", run: toggleTheme },
    { icon: ICONS.link, label: "LinkedIn profile", group: "Link", run: () => window.open("https://www.linkedin.com/in/tyler-farrell-9233a8329/", "_blank", "noopener") },
  ], [navigate]);

  const results = items.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()));
  const selected = Math.min(active, Math.max(results.length - 1, 0));

  useEffect(() => {
    const show = () => {
      setQuery("");
      setActive(0);
      setOpen(true);
    };
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) setOpen(false);
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-menu", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-menu", show);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [open]);

  const run = (item) => {
    if (!item) return;
    setOpen(false);
    item.run();
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(Math.min(selected + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(Math.max(selected - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[selected]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="command-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="command-box" role="dialog" aria-modal="true" aria-label="Quick menu">
        <div className="command-input">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Type a page or action…"
            aria-label="Search pages and actions"
            aria-controls="command-results"
            aria-activedescendant={results.length ? `command-item-${selected}` : undefined}
            autoComplete="off"
          />
          <kbd>Esc</kbd>
        </div>

        <ul id="command-results" className="command-list" role="listbox">
          {results.length ? (
            results.map((item, i) => (
              <li
                key={item.label}
                id={`command-item-${i}`}
                role="option"
                aria-selected={i === selected}
                className={i === selected ? "is-active" : ""}
                onMouseMove={() => setActive(i)}
                onClick={() => run(item)}
              >
                <span className="command-icon" aria-hidden="true">{item.icon}</span>
                {item.label}
                <small>{item.group}</small>
              </li>
            ))
          ) : (
            <li className="command-empty">No results for "{query}"</li>
          )}
        </ul>

        <div className="command-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
          <span><kbd>Enter</kbd> open</span>
          <span><kbd>Ctrl</kbd><kbd>K</kbd> close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandMenu;
