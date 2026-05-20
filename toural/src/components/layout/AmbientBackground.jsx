import React from "react";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
      <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(244,162,97,0.08)_0%,transparent_70%)]" />
      <div className="absolute right-[-6rem] top-[-4rem] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(244,162,97,0.06)_0%,transparent_70%)]" />
      <div className="absolute bottom-[-6rem] left-[-4rem] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(244,162,97,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,162,97,0.06),transparent_60%)]" />
    </div>
  );
}
