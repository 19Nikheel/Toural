import React from "react";

export default function TextInput({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  required = false,
  className = "",
  error,
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-[0.75rem] font-medium text-[#777]">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={`w-full rounded-xl border border-[#F4A261]/25 bg-white/80 backdrop-blur-md px-3 py-2 text-sm text-[#1a1a1a] outline-none transition focus:border-[#F4A261]/50 focus:ring-1 focus:ring-[#F4A261]/40 placeholder:text-[#aaa] ${
          error ? "border-red-400 focus:border-red-400 focus:ring-red-400" : ""
        }`}
      />
      {error && <p className="text-[0.7rem] text-red-500">{error}</p>}
    </div>
  );
}
