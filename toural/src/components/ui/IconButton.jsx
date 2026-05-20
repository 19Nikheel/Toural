import React from "react";

export default function IconButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-emerald-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
