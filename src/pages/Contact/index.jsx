import React from 'react';

// Contact Form Component
const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., send to an API)
    alert('Thank you for your feedback!');
    e.target.reset();
  };

  return (
    <div className="card">
      <h3>Feedback / Collaboration Inquiry</h3>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <input className="input" type="text" placeholder="Your Name" required />
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input className="input" type="email" placeholder="Your Email" required />
        </div>
        <div className="field">
          <label className="label">Message</label>
          <textarea className="textarea" placeholder="Your message..." rows="5" required></textarea>
        </div>
        <button className="button is-primary" type="submit">Submit</button>
      </form>
    </div>
  );
};


// Main Contact Page Component
const Contact = () => {
  return (
    <div>
      <h2>Contact Us</h2>
      <div className="columns">
        <div className="column is-two-thirds">
          <ContactForm />
        </div>
        <div className="column">
          <div className="card">
            <h3>Other Ways to Reach Us</h3>
            <p>You can also reach out via email or our dedicated collaboration portal.</p>
            <p><strong>📧 Email:</strong> <a href="mailto:contact@signalchecker.com">contact@signalchecker.com</a></p>
            <p><strong>🔗 Link:</strong> <a href="https://streetwave.co/">Collaboration Portal</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;