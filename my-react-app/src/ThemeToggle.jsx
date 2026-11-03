// Both icons stay in the button so one can spin out while the other spins in (styled in NavBar.css)
const ThemeToggle = ({ theme, toggleTheme, className = "" }) => (
  <button
    type="button"
    onClick={toggleTheme}
    className={`navbar-social-icon theme-toggle-btn ${theme === "dark" ? "is-dark" : "is-light"} ${className}`}
    aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
  >
    <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
    <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  </button>
);

export default ThemeToggle;
