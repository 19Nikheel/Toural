import React from "react";

const Footer = () => (
  <footer className="border-t border-slate-200/70 bg-slate-50/70 px-4 py-4 text-[0.75rem] text-slate-500 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400 md:px-6">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 md:flex-row">
      {/* Left side */}
      <div className="flex flex-col items-center gap-1 md:items-start">
        <p className="font-medium text-slate-700 dark:text-slate-200">Toural</p>
        <p className="text-[0.7rem]">
          Designed as a sample tour-planning UI. No real bookings or payments
          are processed.
        </p>
      </div>

      {/* Right side */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-[0.7rem]">
        <button
          type="button"
          className="hover:text-emerald-500 dark:hover:text-emerald-300"
        >
          About
        </button>
        <span className="h-1 w-1 rounded-full bg-slate-400/60" />
        <button
          type="button"
          className="hover:text-emerald-500 dark:hover:text-emerald-300"
        >
          Support
        </button>
        <span className="h-1 w-1 rounded-full bg-slate-400/60" />
        <button
          type="button"
          className="hover:text-emerald-500 dark:hover:text-emerald-300"
        >
          Terms
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
