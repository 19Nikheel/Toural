import React from "react";

export default function AuthHeader({ title, subtitle }) {
  return (
    <header className="mb-5 flex flex-col items-center text-center">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4A261] text-sm font-semibold text-white shadow-[0_4px_14px_rgba(244,162,97,0.4)]">
        ✈️
      </div>
      <h1 className="text-lg font-serif font-semibold text-[#1a1a1a]">
        {title}
      </h1>
      {subtitle && <p className="mt-1 text-xs text-[#777]">{subtitle}</p>}
    </header>
  );
}
