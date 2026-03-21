import React, { useState } from "react";
import "./styles.css";

export default function PriceRangeSlider({ MIN = 0, MAX = 10000, STEP = 100 }) {
  const [minVal, setMinVal] = useState(2000);
  const [maxVal, setMaxVal] = useState(8000);

  const handleMinChange = (e) => {};
  const handleMaxChange = (e) => {};

  return (
    <div>
      <h2>Price Range</h2>

      {/* Inputs */}
      <input
        data-testid="input-min"
        type="number"
        value={minVal}
        onChange={handleMinChange}
      />
      <input
        data-testid="input-max"
        type="number"
        value={maxVal}
        onChange={handleMaxChange}
      />

      {/* Sliders */}
      <input
        data-testid="slider-min"
        type="range"
        value={minVal}
        onChange={handleMinChange}
      />
      <input
        data-testid="slider-max"
        type="range"
        value={maxVal}
        onChange={handleMaxChange}
      />

      {/* Labels */}
      <div data-testid="label-min">₹{minVal}</div>
      <div data-testid="label-max">₹{maxVal}</div>

      {/* Track fill placeholder */}
      <div data-testid="slider-track-fill"></div>
    </div>
  );
}
