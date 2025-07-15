import React from 'react';
import './index.css'; // CSS for footer styling

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>SignalChecker provides reliable mobile signal data across the UK. In partnership with Streetwave Ltd.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          {/* Add your social media links here */}
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} SignalChecker. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;