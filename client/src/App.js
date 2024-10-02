// src/App.js
import React, { useState, useEffect } from 'react';
import RegionSelect from './components/RegionSelect';
import ErrorControl from './components/ErrorControl';
import DataTable from './components/DataTable';
import './App.css'; // Assuming you have some basic styles

const App = () => {
  const [regions] = useState(['USA', 'Poland', 'France']);
  const [selectedRegion, setSelectedRegion] = useState('USA');
  const [errorAmount, setErrorAmount] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [data, setData] = useState([]);
  const [seed, setSeed] = useState(42);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/generate?region=${selectedRegion}&errors=${errorAmount}&seed=${seed}`
      );
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, [selectedRegion, errorAmount, seed]);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleErrorChange = (e) => {
    setErrorAmount(e.target.value);
    setSliderValue(Math.min(e.target.value, 10));
  };

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setSliderValue(value);
    setErrorAmount(value);
  };

  const handleRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 100000));
  };

  return (
    <div>
      <h1>Fake User Data Generator</h1>
      <RegionSelect
        regions={regions}
        selectedRegion={selectedRegion}
        onRegionChange={handleRegionChange}
      />
      <ErrorControl
        errorAmount={errorAmount}
        onErrorChange={handleErrorChange}
        sliderValue={sliderValue}
        onSliderChange={handleSliderChange}
      />
      <button onClick={handleRandomSeed}>Random Seed</button>
      <p>Current Seed: {seed}</p>
      <DataTable data={data} />
    </div>
  );
};

export default App;
