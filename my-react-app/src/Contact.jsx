import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleBack = () => {
    setSubmitted(false);
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("https://portfolio-production-e5f3.up.railway.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
        e.target.reset();
      } else {
        alert("Failed to send message");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Failed to send message");
    }
  };

  if (submitted) {
    return (
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
    );
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container-centered">
        <h2 className="contact-title">Contact me</h2>
        <p className="contact-description">Hire me today!</p>

        <div className="contact-form-box">
          <form 
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write a message!"
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;