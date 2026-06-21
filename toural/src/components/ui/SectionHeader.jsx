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
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[#C9622A]">
            {eyebrow}
          </p>
        )}
        {title && (
          <p className="text-sm font-semibold text-[#1a1a1a]">{title}</p>
        )}
        {subtitle && <p className="mt-1 text-xs text-[#777]">{subtitle}</p>}
      </div>
      {action && <div className="text-[0.7rem]">{action}</div>}
    </div>
  );
}
