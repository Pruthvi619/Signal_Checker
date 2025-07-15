import React, { useState } from 'react';

// Form Component
const SignalForm = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [wallMaterial, setWallMaterial] = useState('');
  const [network, setNetwork] = useState('4G');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !wallMaterial) {
        alert("Please fill in all fields.");
        return;
    }
    onSubmit({ address, wallMaterial, network });
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Enter Address / Location</label>
          <input className="input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g., 123 Main St, London" required />
        </div>
        <div className="field">
          <label className="label">Select Wall Material</label>
          <div className="select" style={{width: '100%'}}>
            <select value={wallMaterial} onChange={(e) => setWallMaterial(e.target.value)} required style={{width: '100%'}}>
              <option value="">Select material...</option>
              <option value="brick">Brick</option>
              <option value="concrete">Concrete</option>
              <option value="wood">Wood</option>
              <option value="glass">Glass</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label className="label">Select Network (4G / 5G)</label>
          <label className="radio" style={{marginRight: '1rem'}}>
            <input type="radio" name="network" value="4G" checked={network === '4G'} onChange={(e) => setNetwork(e.target.value)} /> 4G
          </label>
          <label className="radio">
            <input type="radio" name="network" value="5G" checked={network === '5G'} onChange={(e) => setNetwork(e.target.value)} /> 5G
          </label>
        </div>
        <button type="submit" className="button is-primary" style={{width: '100%', marginTop: '1rem'}}>View Signal Map</button>
      </form>
    </div>
  );
};

// Map Display Component
const SignalMap = ({ formData }) => {
  return (
    <div className="card">
      <h3>Outdoor Signal Map</h3>
      {formData ? (
        <div>
          <p>Showing results for: <strong>{formData.address}</strong> on the <strong>{formData.network}</strong> network.</p>
          <div className="heatmap-placeholder">
            <h4>Signal Heatmap (Streetwave Data)</h4>
            <p>[Interactive Map Component Would Go Here]</p>
          </div>
          <div className="prediction-form" style={{marginTop: '1.5rem'}}>
            <h4>Prediction Request Form</h4>
            <p>Don't see your location? Request a detailed prediction.</p>
            <button className="button is-info">Request Prediction</button>
          </div>
        </div>
      ) : (
        <p>Please enter details in the form to see the signal map.</p>
      )}
    </div>
  );
};


// Main Page Component
const CheckSignalStrength = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    // In a real app, you would make an API call here.
    console.log("Form submitted:", data);
  };

  return (
    <div>
      <h2>Check Signal Strength</h2>
      <div className="columns">
        <div className="column is-one-third">
          <SignalForm onSubmit={handleFormSubmit} />
        </div>
        <div className="column">
          <SignalMap formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CheckSignalStrength;