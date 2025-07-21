import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';

// Fix Leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

// Utility: Convert address to latitude/longitude using OpenStreetMap Nominatim API
const geocodeAddress = async (address) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
  const data = await response.json();
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }
  return null;
};

// --------------------- Form Component ---------------------
const SignalForm = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [wallMaterial, setWallMaterial] = useState('');
  const [materialEnabled, setMaterialEnabled] = useState(true);
  const [wallThickness, setWallThickness] = useState('');
  const [network, setNetwork] = useState('4G');
  const [operator, setOperator] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || (materialEnabled && (!wallMaterial || !wallThickness))) {
      alert("Please fill in all required fields.");
      return;
    }

    // Send collected data to parent
    onSubmit({ address, wallMaterial, wallThickness, network, operator });
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Enter Address / Location</label>
          <input className="input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g., 123 Main St, London" required />
        </div>

        <div className="field">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={materialEnabled}
              onChange={(e) => setMaterialEnabled(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Include wall material and thickness
          </label>
        </div>

        {materialEnabled && (
          <>
            <div className="field">
              <label className="label">Select Wall Material</label>
              <div className="select" style={{ width: '100%' }}>
                <select value={wallMaterial} onChange={(e) => setWallMaterial(e.target.value)} required style={{ width: '100%' }}>
                  <option value="">Select material...</option>
                  <option value="brick">Brick</option>
                  <option value="concrete">Concrete</option>
                  <option value="wood">Wood</option>
                  <option value="glass">Glass</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label className="label">Wall Thickness (cm)</label>
              <input className="input" type="number" min="0" placeholder="e.g., 30" value={wallThickness} onChange={(e) => setWallThickness(e.target.value)} required />
            </div>
          </>
        )}

        <div className="field">
          <label className="label">Select Network (4G / 5G)</label>
          <label className="radio" style={{ marginRight: '1rem' }}>
            <input type="radio" name="network" value="4G" checked={network === '4G'} onChange={(e) => setNetwork(e.target.value)} /> 4G
          </label>
          <label className="radio">
            <input type="radio" name="network" value="5G" checked={network === '5G'} onChange={(e) => setNetwork(e.target.value)} /> 5G
          </label>
        </div>

        <div className="field">
          <label className="label">Select Network Operator</label>
          <div className="select" style={{ width: '100%' }}>
            <select value={operator} onChange={(e) => setOperator(e.target.value)} style={{ width: '100%' }}>
              <option value="">Select operator...</option>
              <option value="EE">EE</option>
              <option value="Vodafone">Vodafone</option>
              <option value="O2">O2</option>
              <option value="Three">Three</option>
            </select>
          </div>
        </div>

        <button type="submit" className="button is-primary" style={{ width: '100%', marginTop: '1rem' }}>
          View Signal Map
        </button>
      </form>
    </div>
  );
};

// --------------------- Map Display Component ---------------------
const SignalMap = ({ formData }) => {
  const position = formData?.coords || [51.5074, -0.1278]; // Default: London

  return (
    <div className="card">
      <h3>Outdoor Signal Map</h3>
      {formData ? (
        <>
          <p>Showing results for: <strong>{formData.address}</strong> on the <strong>{formData.network}</strong> network.</p>
          {formData.operator && <p>Operator: <strong>{formData.operator}</strong></p>}
          {formData.wallMaterial && (
            <p>
              Wall Material: <strong>{formData.wallMaterial}</strong> | Thickness: <strong>{formData.wallThickness} cm</strong>
            </p>
          )}

          <div style={{ height: "400px", marginTop: "1rem" }}>
            <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>{formData.address}</Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="prediction-form" style={{ marginTop: '1.5rem' }}>
            <h4>Prediction Request Form</h4>
            <p>Don't see your location? Request a detailed prediction.</p>
            <button className="button is-info">Request Prediction</button>
          </div>
        </>
      ) : (
        <p>Please enter details in the form to see the signal map.</p>
      )}
    </div>
  );
};

// --------------------- Main Page Component ---------------------
const CheckSignalStrength = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = async (data) => {
    const coords = await geocodeAddress(data.address);
    if (!coords) {
      alert("Could not locate the address.");
      return;
    }

    // Update form data with geocoded coordinates
    setFormData({ ...data, coords });
    console.log("Form submitted:", { ...data, coords });
  };

  return (
    <div className="check-signal-wrapper">
  <h2>Check Signal Strength</h2>
  <div className="signal-columns">
    <div className="signal-form">
      <SignalForm onSubmit={handleFormSubmit} />
    </div>
    <div className="signal-map">
      <SignalMap formData={formData} />
    </div>
  </div>
</div>
  );
};

export default CheckSignalStrength;
