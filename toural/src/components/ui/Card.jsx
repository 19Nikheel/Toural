// src/components/ui/Card.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({
  children,
  className = "",
  padding = "p-7 md:p-8",
  hover = true,
  ...props
}) {
  const baseClasses = `
    rounded-3xl
    min-h-fit             /* More height for richer card visuals */
    border border-slate-200/60
    bg-white/95
    dark:border-white/10
    dark:bg-slate-900/80
    backdrop-blur-xl
    shadow-[0_14px_50px_rgba(0,0,0,0.08)]
    dark:shadow-[0_18px_70px_rgba(0,0,0,0.55)]
    transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]
  `;

  const hoverClasses = hover
    ? `
      hover:scale-[1.025]
      hover:-translate-y-1.5
      hover:border-emerald-400/80
      hover:shadow-[0_28px_90px_rgba(16,185,129,0.32)]
      dark:hover:border-emerald-300/70
    `
    : "";

  const textEnhance = `
    text-[1rem]              /* Base text upscaled */
    md:text-[1.05rem]        /* Slightly bigger on desktop */
    leading-relaxed
    text-slate-700
    dark:text-slate-200
  `;
  return (
    <div
      className={`${baseClasses} ${textEnhance} ${padding} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
