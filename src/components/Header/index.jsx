import React from 'react';
import Navbar from '../Navbar';
import cover from '../../assets/cover.png';
import './index.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="brand-tagline">
        <h1>UEA Signal Checker</h1>
        <p>Find the best mobile signal in your area</p>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
