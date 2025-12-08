import React from "react";

export default function HomeInfoStrip() {
  return (
    <div className="mt-3 rounded-2xl border border-dashed border-emerald-500/40 bg-emerald-50 px-4 py-3 text-[0.75rem] text-emerald-800 shadow-sm dark:bg-emerald-500/5 dark:text-emerald-100">
      <p className="font-medium">
        Coming next: live hotel prices & real-time availability.
      </p>
      <p className="mt-1 text-[0.7rem] text-emerald-700/90 dark:text-emerald-200/80">
        Right now you see a sample of what your trip planner UI will look like.
        You can later plug in your own APIs for hotels, flights, and activities.
      </p>
    </div>
  );
}
