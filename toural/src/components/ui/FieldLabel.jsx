// src/components/ui/FieldLabel.jsx
import React from "react";

export default function FieldLabel({
  children,
  right,
  htmlFor,
  className = "",
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`flex items-center justify-between text-[0.7rem] font-medium text-slate-700 dark:text-slate-200 ${className}`}
    >
      <span>{children}</span>
      {right && <span>{right}</span>}
    </label>
  );
}
