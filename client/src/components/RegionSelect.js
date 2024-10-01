// src/components/RegionSelect.js
import React from 'react';

const RegionSelect = ({ regions, selectedRegion, onRegionChange }) => {
  return (
    <select value={selectedRegion} onChange={onRegionChange}>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
};

export default RegionSelect;
