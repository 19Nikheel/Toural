// src/components/ui/TextInput.jsx
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
        <label
          htmlFor={id}
          className="text-[0.75rem] font-medium text-slate-700 dark:text-slate-200"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name} // <- forward name to input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={`w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:border-white/10 dark:bg-black/40 dark:text-slate-50 dark:placeholder:text-slate-500 ${
          error
            ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400"
            : ""
        }`}
      />
      {error && (
        <p className="text-[0.7rem] text-rose-500 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
