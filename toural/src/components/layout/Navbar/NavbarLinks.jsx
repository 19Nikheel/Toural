import React from "react";
import { NavLink } from "react-router-dom";

export default function NavbarLinks() {
  const links = [
    { label: "Home", to: "/" },
    { label: "Destination", to: "/destination" },
    { label: "Hotel", to: "/hotels" },
    { label: "My Trip", to: "/my-trips" },
  ];

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `
            px-4 py-1.5 rounded-xl text-[13.5px] font-medium
            transition-all duration-150
            
            ${
              isActive
                ? "bg-[#F4A261]/15 text-[#C9622A]"
                : "text-[#555] hover:bg-[#F4A261]/10 hover:text-[#1a1a1a]"
            }
          `
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
