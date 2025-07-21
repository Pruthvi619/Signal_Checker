import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Home = () => {
  return (
    <div className="page-content">
      {/* Hero Section */}
      <h1>Welcome to SignalChecker</h1>
      <p>Your one-stop solution for checking and comparing mobile signal strength anywhere.</p>
      <div className="home-buttons">
        <Link to="/check-signal" className="button is-primary">Check Signal Now</Link>
        <Link to="/compare-providers" className="button">Compare Providers</Link>
      </div>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h4>1. Enter Your Location</h4>
            <p>Start by entering your address or postcode.</p>
          </div>
          <div className="step">
            <h4>2. View Signal Strength</h4>
            <p>Get real-time signal coverage for 4G/5G from major UK networks.</p>
          </div>
          <div className="step">
            <h4>3. Compare Providers</h4>
            <p>Quickly find the best mobile network for your area.</p>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="stats-section">
        <h2>Live Coverage Stats</h2>
        <div className="stats">
          <div className="stat">
            <strong>12,000+</strong>
            <p>UK Locations Covered</p>
          </div>
          <div className="stat">
            <strong>4</strong>
            <p>Major Network Providers</p>
          </div>
          <div className="stat">
            <strong>98%</strong>
            <p>Signal Data Accuracy</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-card">
          <p>"Found the best network for my flat in 2 minutes. Excellent tool!"</p>
          <strong>– Priya, Manchester</strong>
        </div>
        <div className="testimonial-card">
          <p>"Accurate and super fast signal checking. Highly recommended."</p>
          <strong>– Tom, Norwich</strong>
        </div>
      </section>
    </div>
  );
};

export default Home;
