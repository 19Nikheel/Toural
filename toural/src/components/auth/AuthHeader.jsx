import React from "react";

export default function AuthHeader({ title, subtitle }) {
  return (
    <header className="mb-5 flex flex-col items-center text-center">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 text-lg font-bold text-slate-950 shadow-lg shadow-emerald-500/40">
        ✈️
      </div>
      <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </header>
  );
}
