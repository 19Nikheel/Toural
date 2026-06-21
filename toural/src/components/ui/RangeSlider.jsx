// src/components/ui/RangeSlider.jsx
import React from "react";

export default function RangeSlider({
  id,
  min,
  max,
  step,
  value,
  onChange,
  className = "",
}) {
  return (
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className={`w-full accent-emerald-400 ${className}`}
    />
  );
}
