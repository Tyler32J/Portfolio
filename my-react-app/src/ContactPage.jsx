import { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import ContactForm from './ContactForm';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  // "idle" | "sending" | "error": shown on the form's button and under it (ContactForm.jsx)
  const [status, setStatus] = useState("idle");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  const handleBack = () => {
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const formData = new FormData(e.target);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: `[${formData.get("topic")}] ${formData.get("message")}`,
    };

    try {
      const res = await fetch(apiBaseUrl + "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        e.target.reset();
        setStatus("idle");
        setSubmitted(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (submitted) {
    return (
      <>
        <NavBar />
        <section className="contact-section">
          <div className="success-container">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Thank You!</h2>
            <p className="success-message">The form was submitted successfully.</p>
            <button className="back-button" onClick={handleBack}>
              ← Back to Previous Page
            </button>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <section className="contact-section" id="contact">
        <div className="contact-container-centered">
          <div className="section-header">
            <h2>Contact Me</h2>
            <p>Looking forward to hearing from you!</p>
          </div>

          <ContactForm onSubmit={handleSubmit} status={status} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;