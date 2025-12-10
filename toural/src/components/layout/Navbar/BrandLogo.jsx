// src/components/layout/Navbar/BrandLogo.jsx
import React from "react";

export default function BrandLogo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 text-lg font-bold text-slate-950 shadow-lg shadow-emerald-500/40">
        ✈️
      </div>
      <div>
        <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Toural
        </p>
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Smart Tour Planner
        </p>
      </div>
    </a>
  );
}
