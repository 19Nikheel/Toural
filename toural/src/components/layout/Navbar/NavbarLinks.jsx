import React from "react";
import { NavLink } from "react-router-dom";

export default function NavbarLinks() {
  const links = [
    { label: "Home", to: "/" },
    { label: "Trips", to: "/results" },
    { label: "My Trips", to: "/my-trips" },
  ];

  return (
    <nav className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-300 md:flex">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `transition-colors ${
              isActive
                ? "text-emerald-500 dark:text-emerald-300"
                : "hover:text-emerald-500 dark:hover:text-emerald-300"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
