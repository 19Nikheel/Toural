import React from "react";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/25" />
      <div className="absolute right-[-5rem] top-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/25" />
      <div className="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-fuchsia-400/10 blur-3xl dark:bg-fuchsia-500/15" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),transparent_60%)]" />
    </div>
  );
}
