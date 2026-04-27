import React from "react";
import AmbientBackground from "../layout/AmbientBackground";

export default function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white text-[#1a1a1a]">
      <AmbientBackground />
      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-[#F4A261]/20 bg-white/80 p-6 shadow-[0_12px_40px_rgba(244,162,97,0.15)] backdrop-blur-[24px] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(244,162,97,0.08)] md:p-7">
        {children}
      </div>
    </div>
  );
}
