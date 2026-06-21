import React from "react";
import Pill from "../ui/Pill";

export default function HeroSection() {
  return (
    <section className="flex w-full flex-col gap-6 lg:w-[80%] p-4">
      <Pill
        variant="subtle"
        className="border lg:w-[40%] border-[#F4A261]/25 bg-[#F4A261]/10 text-[0.7rem] uppercase tracking-[0.18em] text-[#C9622A]"
      >
        <span className="mr-1 text-sm">🧭</span>
        <span>Plan smarter, travel better</span>
      </Pill>

      <div>
        <h1 className="text-5xl font-serif font-semibold leading-tight tracking-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl">
          Your <span className="text-[#F4A261] italic">next adventure</span>{" "}
          designed around{" "}
          <span className="underline decoration-[#F4A261]/70 decoration-wavy">
            your choices
          </span>
          .
        </h1>

        <p className="mt-3 max-w-lg text-sm text-[#777]">
          Tell me your preferences — the kind of places you love — and I’ll
          suggest personalized itineraries with curated stays, must-visit spots.
        </p>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-3 text-[0.7rem] text-[#777]">
        <Pill className="bg-white/80 border border-[#F4A261]/20 text-[#555]">
          <span className="text-xs">🏨</span>
          <span>Verified stays only</span>
        </Pill>

        <Pill className="bg-white/80 border border-[#F4A261]/20 text-[#555]">
          <span className="text-xs">🌍</span>
          <span>All over India</span>
        </Pill>
      </div>
    </section>
  );
}
