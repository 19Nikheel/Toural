import React from "react";

export default function Divider({ label, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      {label && (
        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {label}
        </span>
      )}
      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
