// src/components/ui/Button.jsx
import React from "react";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full transition text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-950";

const variants = {
  primary:
    "bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 text-slate-950 shadow-md shadow-emerald-500/40 hover:brightness-110",
  secondary:
    "bg-slate-900 text-slate-50 border border-slate-900/10 hover:border-emerald-400/70 hover:text-emerald-300 dark:bg-white/5 dark:text-slate-100 dark:border-white/15",
  ghost:
    "bg-transparent text-slate-700 hover:text-emerald-500 hover:bg-slate-100/60 dark:text-slate-300 dark:hover:text-emerald-300 dark:hover:bg-white/5",
};

const sizes = {
  sm: "px-3 py-1",
  md: "px-4 py-1.5",
  lg: "px-5 py-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  return (
    <button className={`${base} ${v} ${s} ${className}`} {...props}>
      {children}
    </button>
  );
}
