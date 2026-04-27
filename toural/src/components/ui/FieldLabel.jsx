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
      className={`flex items-center justify-between text-[0.7rem] font-medium text-[#777] ${className}`}
    >
      <span className="tracking-wide">{children}</span>
      {right && <span className="text-[#C9622A]">{right}</span>}
    </label>
  );
}
