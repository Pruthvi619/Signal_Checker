import React from 'react';
import './index.css'; // Make sure to import the responsive CSS

const About = () => {
  return (
    <div className="about-wrapper">
      <h2>About Our Project</h2>

      <div className="card">
        <h3>Project Overview</h3>
        <p>
          This project aims to provide accurate and real-time mobile signal strength information to help users make informed decisions about their mobile providers.
          We leverage cutting-edge data to deliver precise indoor and outdoor signal predictions.
        </p>
      </div>

      <div className="card">
        <h3>Collaboration with Streetwave Ltd</h3>
        <p>
          We are proud to partner with Streetwave Ltd, utilizing their comprehensive, real-world signal data to power our heatmap and signal predictions.
          This collaboration ensures our information is both reliable and up-to-date.
        </p>
      </div>
    </div>
  );
};

export default About;
