import { useState } from "react";
import { RESUME_URL, openResume } from "./resume";

const topics = ["Website project", "Job opportunity", "IT help", "Just saying hi"];

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const PersonIcon = (props) => (
  <svg {...iconProps} {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
);
const MailIcon = (props) => (
  <svg {...iconProps} {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
const ChatIcon = (props) => (
  <svg {...iconProps} {...props}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
);
const PinIcon = (props) => (
  <svg {...iconProps} {...props}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
const ClockIcon = (props) => (
  <svg {...iconProps} {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
const ArrowIcon = (props) => (
  <svg {...iconProps} strokeWidth={2.5} {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

// Shared by the home page Contact section and the /contact page
const ContactForm = ({ onSubmit, status = "idle" }) => {
  const sending = status === "sending";

  const [topic, setTopic] = useState(topics[0]);

  return (
    <div className="contact-layout">
      <aside className="contact-info-panel">
        <h3 className="contact-info-title">Let's build something together.</h3>
        <p className="contact-info-text">
          Need a website for your business, have a role to fill, or need a hand with IT? Send me a message.
        </p>

        <ul className="contact-details">
          <li>
            <span className="contact-detail-icon"><MailIcon /></span>
            <span>
              <small>Email</small>
              <a href="mailto:farrelltyler32@gmail.com">farrelltyler32@gmail.com</a>
            </span>
          </li>
          <li>
            <span className="contact-detail-icon"><PinIcon /></span>
            <span>
              <small>Based in</small>
              Mississippi
            </span>
          </li>
          <li>
            <span className="contact-detail-icon"><ClockIcon /></span>
            <span>
              <small>Reply time</small>
              Usually within 1–2 days
            </span>
          </li>
        </ul>

        <div className="contact-info-socials">
          <a href={RESUME_URL} className="contact-social-link" target="_blank" rel="noreferrer" onClick={openResume}>
            <img src="/assets/resume.svg" alt="" />
            Résumé
          </a>
          <a href="https://www.linkedin.com/in/tyler-farrell-9233a8329/" className="contact-social-link" target="_blank" rel="noreferrer">
            <img src="/assets/linkedin.svg" alt="" />
            LinkedIn
          </a>
        </div>
      </aside>

      <div className="contact-form-box">
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="topic-group" role="group" aria-labelledby="topic-label">
            <span id="topic-label" className="topic-label">What's this about?</span>
            <div className="topic-options">
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="topic-chip"
                  aria-pressed={topic === t}
                  onClick={() => setTopic(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <input type="hidden" name="topic" value={topic} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <div className="input-wrap">
                <PersonIcon className="input-icon" />
                <input type="text" id="name" name="name" placeholder="Name" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrap">
                <MailIcon className="input-icon" />
                <input type="email" id="email" name="email" placeholder="Email" required />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <div className="input-wrap">
              <ChatIcon className="input-icon" />
              <textarea
                id="message"
                name="message"
                placeholder="Write a message!"
                rows="6"
                required
              ></textarea>
            </div>
          </div>

          <button type="submit" className="submit-button btn-shine" disabled={sending} aria-busy={sending}>
            {sending ? (
              <>
                <span className="submit-spinner" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Send message
                <ArrowIcon />
              </>
            )}
          </button>

          {status === "error" && (
            <p className="form-error" role="alert">
              Your message didn't send. Check your connection and try again, or email me at{" "}
              <a href="mailto:farrelltyler32@gmail.com">farrelltyler32@gmail.com</a>.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
