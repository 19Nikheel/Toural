import React from "react";
import { useNavigate } from "react-router-dom";

export default function MobileMenu({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  const links = [{ label: "Home", to: "/" }];

  function handleNav(to) {
    navigate(to);
    onClose?.();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-4 md:hidden">
      <nav className="relative space-y-1 p-3 rounded-2xl text-sm bg-white/85 backdrop-blur-[24px] border border-[#F4A261]/25 shadow-[0_6px_30px_rgba(244,162,97,0.15)] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(244,162,97,0.08)]">
        {links.map((link) => (
          <button
            key={link.to}
            type="button"
            onClick={() => handleNav(link.to)}
            className="w-full text-left px-3 py-2 rounded-xl text-[#555] transition-all duration-150 hover:bg-[#F4A261]/10 hover:text-[#C9622A]"
          >
            {link.label}
          </button>
        ))}

        <div className="mt-2 pt-3 border-t border-[#F4A261]/20 flex flex-col gap-2">
          <button
            onClick={() => handleNav("/login")}
            className="w-full py-2 rounded-xl text-center bg-white/80 backdrop-blur-md border border-[#F4A261]/30 text-[#333] text-sm font-medium transition-all duration-200 hover:bg-[#F4A261]/10 hover:text-[#C9622A] hover:border-[#F4A261]/50"
          >
            Login
          </button>

          <button
            onClick={() => handleNav("/signup")}
            className="w-full py-2 rounded-xl text-center bg-[#F4A261] text-white text-sm font-medium shadow-[0_4px_14px_rgba(244,162,97,0.4)] transition-all duration-200 hover:bg-[#e8903e] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(244,162,97,0.5)]"
          >
            Start planning
          </button>
        </div>
      </nav>
    </div>
  );
}
