import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';

// ---------------------- Leaflet Marker Icon Fix ----------------------
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

// ---------------------- Utility: Address to Coordinates ----------------------
const geocodeAddress = async (address) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
  const data = await response.json();
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }
  return null;
};

// ---------------------- Form Component ----------------------
const SignalForm = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [wallMaterial, setWallMaterial] = useState('');
  const [materialEnabled, setMaterialEnabled] = useState(true);
  const [wallThickness, setWallThickness] = useState('');
  const [network, setNetwork] = useState('4G');
  const [operator, setOperator] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || (materialEnabled && (!wallMaterial || !wallThickness))) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit({ address, wallMaterial, wallThickness, network, operator });
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Enter Address / Location</label>
          <input
            className="input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g., 123 Main St, London"
            required
          />
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
                <select
                  value={wallMaterial}
                  onChange={(e) => setWallMaterial(e.target.value)}
                  required
                  style={{ width: '100%' }}
                >
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
              <input
                className="input"
                type="number"
                min="0"
                placeholder="e.g., 30"
                value={wallThickness}
                onChange={(e) => setWallThickness(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className="field">
          <label className="label">Select Network (4G / 5G)</label>
          <label className="radio" style={{ marginRight: '1rem' }}>
            <input
              type="radio"
              name="network"
              value="4G"
              checked={network === '4G'}
              onChange={(e) => setNetwork(e.target.value)}
            /> 4G
          </label>
          <label className="radio">
            <input
              type="radio"
              name="network"
              value="5G"
              checked={network === '5G'}
              onChange={(e) => setNetwork(e.target.value)}
            /> 5G
          </label>
        </div>

        <div className="field">
          <label className="label">Select Network Operator</label>
          <div className="select" style={{ width: '100%' }}>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">Select operator...</option>
              <option value="EE">EE</option>
              <option value="Vodafone">Vodafone</option>
              <option value="O2">O2</option>
              <option value="Three">Three</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="button is-primary"
          style={{ width: '100%', marginTop: '1rem' }}
        >
          View Signal Map
        </button>
      </form>
    </div>
  );
};

// ---------------------- Center map on GeoJSON bounds ----------------------
const FitBounds = ({ geojson }) => {
  const map = useMap();
  useEffect(() => {
    if (geojson) {
      const layer = L.geoJSON(geojson);
      map.fitBounds(layer.getBounds(), { padding: [20, 20] });
    }
  }, [geojson, map]);
  return null;
};

// ---------------------- Map Display Component ----------------------
const SignalMap = ({ formData }) => {
  if (!formData) {
    return (
      <div className="card">
        <p>Please enter details in the form to see the signal map.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Outdoor Signal Map</h3>
      <p>
        Showing results for: <strong>{formData.address}</strong> on the <strong>{formData.network}</strong> network.
      </p>
      {formData.operator && <p>Operator: <strong>{formData.operator}</strong></p>}
      {formData.wallMaterial && (
        <p>
          Wall Material: <strong>{formData.wallMaterial}</strong> | Thickness: <strong>{formData.wallThickness} cm</strong>
        </p>
      )}

      <div style={{ height: "400px", marginTop: "1rem" }}>
        <MapContainer
          key={JSON.stringify(formData.coords)} // force reload on new location
          center={formData.coords}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={formData.coords}>
            <Popup>{formData.address}</Popup>
          </Marker>

          {formData.hexData?.features && (
            <>
              <GeoJSON
                data={formData.hexData}
                style={(feature) => {
                  const value = feature.properties.value;
                  let color;
                  if (value <= 35) {
                    color = '#f58383ff';
                  } else if (value <= 70) {
                    color = '#e7db94ff';
                  } else {
                    color = '#7fde7fff';
                  }
                  return {
                    color: feature.properties.isNearest ? '#000000' : color,
                    weight: 1,
                    fillColor: color,
                    fillOpacity: 0.5
                  };
                }}
              />
              <FitBounds geojson={formData.hexData} />
            </>
          )}
        </MapContainer>
      </div>

      {formData.hexData?.nearest && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Nearest Hex Center:</strong> {formData.hexData.nearest.center[1].toFixed(5)}, {formData.hexData.nearest.center[0].toFixed(5)}</p>
          <p><strong>Signal Strength:</strong> {formData.hexData.nearest.value.toFixed(2)}%</p>
        </div>
      )}

      <div className="prediction-form" style={{ marginTop: '1.5rem' }}>
        <h4>Prediction Request Form</h4>
        <p>Don't see your location? Request a detailed prediction.</p>
        <button className="button is-info">Request Prediction</button>
      </div>
    </div>
  );
};

// ---------------------- Main Page Component ----------------------
const CheckSignalStrength = () => {
  const [formData, setFormData] = useState(null);
  const [pendingData, setPendingData] = useState(null);

  const handleFormSubmit = (data) => {
    setPendingData(data);
  };

  useEffect(() => {
    if (!pendingData) return;

    const fetchHexgrid = async () => {
      const coords = await geocodeAddress(pendingData.address);
      if (!coords) {
        alert("Could not locate the address.");
        return;
      }

      const [user_lat, user_lon] = coords;

      try {
        const response = await fetch("https://5gbackend-production.up.railway.app/api/generate-hexgrid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lat: user_lat,
            lon: user_lon,
            width: 12,
            height: 8,
            hex_size: 0.3,
            user_lat,
            user_lon,
            network: pendingData.network,
            operator: pendingData.operator,
          }),
        });

        const dataFromBackend = await response.json();

        setFormData({
          ...pendingData,
          coords: [user_lat, user_lon],
          hexData: dataFromBackend,
        });
      } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong while generating the signal map.");
      }
    };

    fetchHexgrid();
  }, [pendingData]);

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
