import React from 'react';
import Navbar from '../Navbar';
import './index.css'; // custom styles if needed

const Header = () => {
  return (
    <header className="site-header">
      <div className="brand-tagline">
        <h1>SignalChecker</h1>
        <p>Find the best mobile signal in your area</p>
      </div>

      <Navbar />
    </header>
  );
};

export default Header;
