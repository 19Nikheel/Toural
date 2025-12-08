import React from "react";
import AmbientBackground from "../layout/AmbientBackground";

export default function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <AmbientBackground />
      <div className="relative mx-4 w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-white/12 dark:bg-slate-900/80 dark:shadow-[0_18px_60px_rgba(15,23,42,0.9)] md:p-7">
        {children}
      </div>
    </div>
  );
}
