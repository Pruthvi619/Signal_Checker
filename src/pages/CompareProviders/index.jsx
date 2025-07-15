import React, { useState, useEffect } from 'react';

// Filters Component
const ProviderFilters = ({ onFilterChange }) => {
  const [network, setNetwork] = useState('');
  const [location, setLocation] = useState('');

  const handleApply = () => {
    onFilterChange({ network, location });
  };

  return (
    <div className="card filters">
      <h4>Filter by Network / Location</h4>
      <div className="field">
        <label className="label">Network Provider</label>
        <div className="select" style={{width: '100%'}}>
          <select value={network} onChange={(e) => setNetwork(e.target.value)} style={{width: '100%'}}>
            <option value="">All Providers</option>
            <option value="EE">EE</option>
            <option value="O2">O2</option>
            <option value="Vodafone">Vodafone</option>
            <option value="Three">Three</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label className="label">Location</label>
        <input className="input" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Central London" />
      </div>
      <button className="button is-link" onClick={handleApply}>Apply Filters</button>
    </div>
  );
};

// Results Component
const ProviderResults = ({ filters }) => {
  // Placeholder data - replace with API data
  const MOCK_RESULTS = {
    EE: { strength: -85, confidence: 95 },
    O2: { strength: -92, confidence: 91 },
    Vodafone: { strength: -88, confidence: 93 },
    Three: { strength: -95, confidence: 88 },
  };

  const [results, setResults] = useState([]);

  useEffect(() => {
    // This simulates fetching data when filters change.
    if (filters.network) {
        const providerData = MOCK_RESULTS[filters.network];
        setResults(providerData ? [{ provider: filters.network, ...providerData }] : []);
    } else {
        setResults(Object.entries(MOCK_RESULTS).map(([provider, data]) => ({ provider, ...data })));
    }
  }, [filters]);


  return (
    <div className="card results">
      <h3>Comparison Results {filters.location && `for ${filters.location}`}</h3>
      {results.length > 0 ? results.map((result) => (
        <div key={result.provider} className="result-item">
          <h4>{result.provider}</h4>
          <p><strong>Signal Strength Estimate:</strong> {result.strength} dBm</p>
          <p><strong>Confidence Score:</strong> {result.confidence}%</p>
        </div>
      )) : <p>No results found for the selected filter.</p>}
    </div>
  );
};


// Main Page Component
const CompareProviders = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // API call to fetch real comparison data would go here
    console.log("Filters updated:", newFilters);
  };

  return (
    <div>
      <h2>Compare Providers</h2>
      <div className="columns">
        <div className="column is-one-third">
            <ProviderFilters onFilterChange={handleFilterChange} />
        </div>
        <div className="column">
            <ProviderResults filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default CompareProviders;