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
    relative
    rounded-2xl
    min-h-fit
    border border-[#F4A261]/20
    bg-white/80
    backdrop-blur-[24px]
    shadow-[0_8px_32px_rgba(244,162,97,0.12)]
    
    before:absolute before:inset-0 before:rounded-2xl
    before:pointer-events-none
    before:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(244,162,97,0.08)]
    
    transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]
  `;

  const hoverClasses = hover
    ? `
      hover:-translate-y-1
      hover:border-[#F4A261]/40
      hover:shadow-[0_16px_40px_rgba(244,162,97,0.2)]
    `
    : "";

  const textEnhance = `
    text-[0.95rem]
    md:text-[1rem]
    leading-relaxed
    text-[#555]
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
