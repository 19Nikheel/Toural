// src/components/layout/Navbar/MobileMenu.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

export default function MobileMenu({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  const links = [
    { label: "Home", to: "/" },
    // future: { label: "Trips", to: "/results" },
  ];

  function handleNav(to) {
    navigate(to);
    onClose?.();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden">
      <nav className="space-y-1 rounded-2xl border border-slate-200/70 bg-slate-50/95 p-3 text-sm text-slate-700 shadow-lg dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200">
        {links.map((link) => (
          <button
            key={link.to}
            type="button"
            onClick={() => handleNav(link.to)}
            className="block w-full rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
          >
            {link.label}
          </button>
        ))}
        <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-2 dark:border-slate-800">
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-center border border-slate-200/70 bg-slate-100/80 text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            onClick={() => handleNav("/login")}
          >
            Login
          </Button>
          <Button
            size="sm"
            className="w-full justify-center"
            onClick={() => handleNav("/signup")}
          >
            Start planning
          </Button>
        </div>
      </nav>
    </div>
  );
}
