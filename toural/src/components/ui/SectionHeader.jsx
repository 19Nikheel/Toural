// src/components/ui/SectionHeader.jsx
import React from "react";

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  className = "",
}) {
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <div>
        {eyebrow && (
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {eyebrow}
          </p>
        )}
        {title && (
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </p>
        )}
        {subtitle && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="text-[0.7rem]">{action}</div>}
    </div>
  );
}
