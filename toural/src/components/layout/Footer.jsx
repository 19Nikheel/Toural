import React from "react";

const Footer = () => (
  <footer className="border-t border-[#F4A261]/20 bg-white/70 px-4 py-4 text-[0.75rem] text-[#777] backdrop-blur-md md:px-6">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 md:flex-row">
      {/* Left side */}
      <div className="flex flex-col items-center gap-1 md:items-start">
        <p className="font-serif text-[16px] font-semibold text-[#1a1a1a] tracking-[-0.2px]">
          Toural
        </p>
        <p className="text-[0.7rem] text-[#777]">
          Designed as a sample tour-planning UI. No real bookings or payments
          are processed.
        </p>
      </div>

      {/* Right side */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-[0.7rem]">
        <button
          type="button"
          className="transition-colors duration-150 hover:text-[#C9622A]"
        >
          About
        </button>
        <span className="h-1 w-1 rounded-full bg-[#F4A261]/40" />
        <button
          type="button"
          className="transition-colors duration-150 hover:text-[#C9622A]"
        >
          Support
        </button>
        <span className="h-1 w-1 rounded-full bg-[#F4A261]/40" />
        <button
          type="button"
          className="transition-colors duration-150 hover:text-[#C9622A]"
        >
          Terms
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
