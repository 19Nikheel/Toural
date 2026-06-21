// src/components/ui/IconBadge.jsx
import React from "react";

export default function IconBadge({
  children,
  className = "",
  variant = "emerald",
}) {
  const variants = {
    emerald:
      "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-200",
    slate:
      "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  };
  const v = variants[variant] || variants.emerald;

  return (
    <div
      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${v} ${className}`}
    >
      {children}
    </div>
  );
}
