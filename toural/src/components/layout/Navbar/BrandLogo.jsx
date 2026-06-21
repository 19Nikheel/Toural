import React from "react";
import { useNavigate } from "react-router-dom";

export default function BrandLogo() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center gap-3 group"
    >
      {/* Logo Icon */}
      <div
        className="
          flex h-9 w-9 items-center justify-center
          rounded-xl
          
          bg-[#F4A261]
          
          text-white text-sm
          
          shadow-[0_4px_14px_rgba(244,162,97,0.4)]
          
          transition-all duration-200
          group-hover:shadow-[0_6px_20px_rgba(244,162,97,0.5)]
          group-hover:-translate-y-[1px]
        "
      >
        ✈️
      </div>

      {/* Brand Text */}
      <div className="leading-tight">
        <p
          className="
            font-serif text-[20px] font-semibold
            text-[#1a1a1a]
            tracking-[-0.2px]
          "
        >
          Toural
          {/* <sup
            className="
              ml-[2px]
              text-[9px]
              font-sans
              text-[#F4A261]
              uppercase tracking-wider
            "
          >
            ai
          </sup> */}
        </p>

        <p
          className="
            text-[10px]
            font-sans
            uppercase tracking-[0.25em]
            text-[#777]
          "
        >
          Smart Tour Planner
        </p>
      </div>
    </button>
  );
}
