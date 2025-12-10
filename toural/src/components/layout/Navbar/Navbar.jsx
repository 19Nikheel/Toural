// src/components/layout/Navbar/Navbar.jsx
import React, { useState } from "react";
import BrandLogo from "./BrandLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarActions from "./NavbarActions";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../../ui/ThemeToggle";
import { useAuth } from "../../../context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { userAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-slate-50/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 w-full">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-8 py-3 md:px-6">
        <BrandLogo />
        {true && <NavbarLinks />}

        <div className="flex items-center gap-2">
          <NavbarActions />
          <div className="flex items-center gap-2 md:hidden">
            {/* <ThemeToggle /> */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-slate-100/80 text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-emerald-400"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
