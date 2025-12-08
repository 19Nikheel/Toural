// src/components/ui/PasswordInput.jsx
import React, { useState } from "react";

export default function PasswordInput({
  id,
  label,
  name,                      // <- accept name
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
        <label
          htmlFor={id}
          className="text-[0.75rem] font-medium text-slate-700 dark:text-slate-200"
        >
          {label}
        </label>
      )}
      <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400 dark:border-white/10 dark:bg-black/40 dark:text-slate-50">
        <input
          id={id}
          name={name}                    // <- forward name here too
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="w-full bg-transparent text-sm text-slate-900 outline-none dark:text-slate-50"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="ml-2 text-[0.7rem] text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-300"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      {error && (
        <p className="text-[0.7rem] text-rose-500 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
