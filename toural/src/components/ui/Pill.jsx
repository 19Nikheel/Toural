// src/components/ui/Pill.jsx
import React from "react";

const variants = {
  subtle: "bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-200",
  outline:
    "border border-slate-200/80 text-slate-700 bg-transparent dark:border-white/15 dark:text-slate-200",
  highlight:
    "bg-emerald-500/10 text-emerald-700 border border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-200",
  soft: "bg-slate-900/80 text-slate-100 dark:bg-black/60 dark:text-slate-100",
};

export default function Pill({
  children,
  variant = "subtle",
  className = "",
  as = "span",
  ...props
}) {
  const Component = as;
  const v = variants[variant] || variants.subtle;
  return (
    <Component
      className={`inline-flex items-center gap-1 rounded-full text-[0.7rem] px-3 py-1 transition ${v} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
