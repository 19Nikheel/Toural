import React from "react";

const variants = {
  subtle: "bg-[#F4A261]/10 text-[#C9622A] border border-[#F4A261]/20",
  outline: "border border-[#F4A261]/30 text-[#555] bg-transparent",
  highlight: "bg-[#F4A261] text-white border border-[#F4A261]",
  soft: "bg-white/80 backdrop-blur-md text-[#333] border border-[#F4A261]/20",
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
      className={`inline-flex items-center gap-1 rounded-full text-[0.7rem] px-3 py-1 transition-all duration-150 ${v} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
