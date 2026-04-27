import React, { useState } from "react";
import BrandLogo from "./BrandLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarActions from "./NavbarActions";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../../../context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { userAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full px-6 pt-4">
      <div
        className="
        mx-auto flex max-w-7xl items-center justify-between
        px-5 py-3 rounded-2xl
        
        bg-white/70
        backdrop-blur-[28px] saturate-150
        
        border border-[#F4A261]/20
        
        shadow-[0_2px_24px_rgba(244,162,97,0.12)]
        
        before:absolute before:inset-0 before:rounded-2xl
        before:pointer-events-none
        before:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(244,162,97,0.08)]
        
        relative
      "
      >
        {/* LEFT */}
        <BrandLogo />

        {/* CENTER */}
        <div className="hidden md:flex">
          <NavbarLinks />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <NavbarActions />

          {/* Mobile Toggle */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                
                bg-white/80
                backdrop-blur-md
                
                border border-[#F4A261]/30
                
                text-[#777]
                
                transition-all duration-200
                
                hover:bg-[#F4A261]/10
                hover:border-[#F4A261]/50
                hover:text-[#C9622A]
              "
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
