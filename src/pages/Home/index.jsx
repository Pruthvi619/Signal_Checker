import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Home = () => {
  return (
    <div className="page-content">
      <h1>Welcome to SignalChecker</h1>
      <p>Your one-stop solution for checking and comparing mobile signal strength anywhere.</p>
      <div className="home-buttons">
        <Link to="/check-signal" className="button is-primary">Check Signal Now</Link>
        <Link to="/compare-providers" className="button">Compare Providers</Link>
      </div>
    </div>
  );
};

export default Home;