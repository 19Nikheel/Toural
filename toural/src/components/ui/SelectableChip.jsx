// src/components/ui/SelectableChip.jsx
import React from "react";

export default function SelectableChip({
  active,
  children,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-1 rounded-full px-3 py-1 text-[0.7rem] transition";
  const state = active
    ? "bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/40"
    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10";

  return (
    <button
      type="button"
      className={`${base} ${state} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
