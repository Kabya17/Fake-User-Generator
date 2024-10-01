// src/components/ErrorControl.js
import React from 'react';

const ErrorControl = ({ errorAmount, onErrorChange, sliderValue, onSliderChange }) => {
  return (
    <div>
      <input
        type="range"
        min="0"
        max="10"
        value={sliderValue}
        onChange={onSliderChange}
      />
      <input
        type="number"
        min="0"
        max="1000"
        value={errorAmount}
        onChange={onErrorChange}
      />
    </div>
  );
};

export default ErrorControl;
