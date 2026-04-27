import React from "react";

export default function HomeInfoStrip() {
  return (
    <div className="mt-3 rounded-2xl border border-dashed border-[#F4A261]/40 bg-[#F4A261]/10 px-4 py-3 text-[0.75rem] text-[#C9622A] shadow-sm">
      <p className="font-medium">
        Coming next: live hotel prices & real-time availability.
      </p>
      <p className="mt-1 text-[0.7rem] text-[#C9622A]/80">
        Right now you see a sample of what your trip planner UI will look like.
        You can later plug in your own APIs for hotels, flights, and activities.
      </p>
    </div>
  );
}
