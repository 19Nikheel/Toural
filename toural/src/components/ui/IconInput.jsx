import React from "react";

export default function IconInput({
  icon,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) {
  return (
    <div
      className={`flex items-center rounded-xl border border-[#F4A261]/25 bg-white/80 backdrop-blur-md px-3 py-2 text-xs focus-within:border-[#F4A261]/50 ${className}`}
    >
      <span className="mr-2 text-sm text-[#F4A261]">{icon}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-[#1a1a1a] placeholder:text-[#aaa] outline-none"
      />
    </div>
  );
}
