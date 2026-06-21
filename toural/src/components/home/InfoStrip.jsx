import React from "react";

export default function InfoStrip() {
  return (
    <div className="mt-2 rounded-2xl border border-dashed border-[#F4A261]/40 bg-[#F4A261]/10 px-4 py-3 text-[0.75rem] text-[#C9622A]">
      <p className="font-medium">
        Coming next: full planner with hotel & sightseeing suggestions.
      </p>
      <p className="mt-1 text-[0.7rem] text-[#C9622A]/80">
        This is just the home page UI. Later you can connect this to a results
        page showing destination cards with hotels and tourist spots based on
        your inputs.
      </p>
    </div>
  );
}
