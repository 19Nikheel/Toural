import React, { useState } from "react";

export default function PasswordInput({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  autoComplete = "current-password",
  required = false,
  className = "",
  error,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-[0.75rem] font-medium text-[#777]">
          {label}
        </label>
      )}
      <div
        className={`flex items-center rounded-xl border px-3 py-2 text-sm transition backdrop-blur-md bg-white/80 ${
          error
            ? "border-red-400 focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400"
            : "border-[#F4A261]/25 focus-within:border-[#F4A261]/50 focus-within:ring-1 focus-within:ring-[#F4A261]/40"
        }`}
      >
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="w-full bg-transparent text-sm text-[#1a1a1a] outline-none placeholder:text-[#aaa]"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="ml-2 text-[0.7rem] text-[#777] hover:text-[#C9622A]"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      {error && <p className="text-[0.7rem] text-red-500">{error}</p>}
    </div>
  );
}
