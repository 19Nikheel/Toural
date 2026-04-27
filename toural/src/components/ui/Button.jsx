import React from "react";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50 focus:ring-offset-2 focus:ring-offset-white";

const variants = {
  primary:
    "bg-[#F4A261] text-white shadow-[0_4px_14px_rgba(244,162,97,0.4)] hover:bg-[#e8903e] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(244,162,97,0.5)]",
  secondary:
    "bg-white/80 backdrop-blur-md text-[#333] border border-[#F4A261]/30 hover:bg-[#F4A261]/10 hover:text-[#C9622A] hover:border-[#F4A261]/50",
  ghost:
    "bg-transparent text-[#555] hover:text-[#C9622A] hover:bg-[#F4A261]/10",
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
