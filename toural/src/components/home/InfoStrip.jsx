// src/components/home/InfoStrip.jsx
import React from "react";

export default function InfoStrip() {
  return (
    <div className="mt-2 rounded-2xl border border-dashed border-emerald-500/40 bg-emerald-500/5 px-4 py-3 text-[0.75rem] text-emerald-100">
      <p className="font-medium">
        Coming next: full planner with hotel & sightseeing suggestions.
      </p>
      <p className="mt-1 text-[0.7rem] text-emerald-200/80">
        This is just the home page UI. Later you can connect this to a results
        page showing destination cards with hotels and tourist spots based on
        your inputs.
      </p>
    </div>
  );
}
