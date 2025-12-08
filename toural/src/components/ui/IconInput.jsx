// src/components/ui/IconInput.jsx
import React from "react";

export default function IconInput({
  icon,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) {
  return (
    <div
      className={`flex items-center rounded-2xl border border-slate-200/80 bg-slate-50 px-3 py-2 text-xs focus-within:border-emerald-400/80 dark:border-white/12 dark:bg-black/40 ${className}`}
    >
      <span className="mr-2 text-sm text-slate-500 dark:text-slate-400">
        {icon}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none dark:text-slate-50 dark:placeholder:text-slate-500"
      />
    </div>
  );
}
