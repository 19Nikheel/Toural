import React from "react";
import Pill from "../ui/Pill";

export default function HeroSection() {
  return (
    <section className="flex w-full flex-col gap-6 lg:w-[80%] p-4">
      <Pill
        variant="subtle"
        className="border lg:w-[40%] border-slate-200/60 bg-slate-50/70 text-[0.7rem] uppercase tracking-[0.18em] text-slate-600 dark:border-white/10 dark:bg-black/40 dark:text-slate-300"
      >
        <span className="mr-1 text-sm">🧭</span>
        <span>Plan smarter, travel better</span>
      </Pill>

      <div>
        <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-slate-50">
          Your{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
            next adventure
          </span>{" "}
          designed around{" "}
          <span className="underline decoration-emerald-400/70 decoration-wavy">
            your budget
          </span>
          .
        </h1>
        <p className="mt-3 max-w-lg text-sm text-slate-600 dark:text-slate-300">
          Tell us how much you want to spend and the kind of place you love.
          We’ll suggest smart itineraries with curated stays, must-visit spots,
          and clear cost estimates.
        </p>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-3 text-[0.7rem] text-slate-500 dark:text-slate-400">
        <Pill>
          <span className="text-xs">⚡</span>
          <span>AI-assisted itineraries</span>
        </Pill>
        <Pill>
          <span className="text-xs">🏨</span>
          <span>Verified stays only</span>
        </Pill>
        <Pill>
          <span className="text-xs">🌍</span>
          <span>India &amp; international</span>
        </Pill>
      </div>
    </section>
  );
}
