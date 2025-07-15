import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Import Page Components
import Home from './pages/Home';
import About from './pages/About';
import CheckSignalStrength from './pages/CheckSignalStrength';
import CompareProviders from './pages/CompareProviders';
import Contact from './pages/Contact';

import './App.css'; // Main app styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/check-signal" element={<CheckSignalStrength />} />
            <Route path="/compare-providers" element={<CompareProviders />} />
            <Route path="/contact" element={<Contact />} />
            {/* Define a placeholder for the privacy policy link */}
            <Route path="/privacy-policy" element={<div><h1>Privacy Policy</h1><p>Content to be added here.</p></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;