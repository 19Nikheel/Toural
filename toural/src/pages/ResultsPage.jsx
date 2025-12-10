// src/pages/ResultsPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTour } from "../context/TourContext";
import SectionHeader from "../components/ui/SectionHeader";
import FieldLabel from "../components/ui/FieldLabel";
import RangeSlider from "../components/ui/RangeSlider";
import IconInput from "../components/ui/IconInput";
import DestinationCard from "../components/results/DestinationCard";

function calculateTripCost(destination, nights, travelers) {
  const pricePerPersonPerNight =
    destination.price != null ? destination.price : 0;

  const total = travelers * nights * pricePerPersonPerNight;
  return Math.round(total);
}

const vibeOptions = [
  { id: "any", label: "Any", icon: "✨" },
  { id: "romantic", label: "Romantic", icon: "💖" },
  { id: "family", label: "Family", icon: "👨‍👩‍👧" },
  { id: "adventure", label: "Adventure", icon: "⛰️" },
  { id: "party", label: "Party", icon: "🎉" },
  { id: "nature", label: "Nature", icon: "🌿" },
];

export default function ResultsPage() {
  const [budget, setBudget] = useState(60000);
  const [nights, setNights] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [placePreference, setPlacePreference] = useState("");
  const [vibe, setVibe] = useState("any");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cityCode = params.get("cityCode");

  const { tours, fetchToursByCityCode, loading } = useTour();

  useEffect(() => {
    if (cityCode) {
      fetchToursByCityCode(cityCode);
    }
  }, [cityCode, fetchToursByCityCode]);

  const filtered = useMemo(() => {
    if (!Array.isArray(tours)) return [];

    const query = placePreference.trim().toLowerCase();

    return tours
      .map((d) => {
        // normalize tags: string -> array<string>
        const tagsArray =
          typeof d.tags === "string"
            ? d.tags
                .split(",")
                .map((t) => t.trim().toLowerCase())
                .filter(Boolean)
            : Array.isArray(d.tags)
            ? d.tags.map((t) => String(t).toLowerCase())
            : [];

        const totalTripCost = calculateTripCost(d, nights, travelers);
        const perPersonCost =
          travelers > 0 ? Math.round(totalTripCost / travelers) : totalTripCost;

        const matchesLocation =
          !query ||
          d.name?.toLowerCase().includes(query) ||
          d.cityName?.toLowerCase().includes(query) ||
          tagsArray.some((t) => t.includes(query));

        const matchesVibe =
          vibe === "any" || tagsArray.some((t) => t === vibe.toLowerCase());

        const matchesBudget = totalTripCost <= budget;

        return {
          ...d,
          totalTripCost,
          perPersonCost,
          isVisible: matchesLocation && matchesVibe && matchesBudget,
        };
      })
      .filter((d) => d.isVisible)
      .sort((a, b) => a.totalTripCost - b.totalTripCost);
  }, [tours, budget, nights, travelers, placePreference, vibe]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 md:px-6">
        <SectionHeader
          eyebrow="Your trip blueprint"
          title="Tailored destinations matching your budget & vibe"
          subtitle={`Adjust filters to refine where you stay & what you see.`}
          action={
            <span className="text-[0.7rem] text-slate-500 dark:text-slate-400">
              {filtered.length} match{filtered.length !== 1 ? "es" : ""} found
            </span>
          }
        />

        {/* Filter controls (card) */}
        <div className="rounded-3xl border border-slate-200/10 bg-white/60 dark:border-white/10 dark:bg-slate-900/70 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="grid gap-3 md:grid-cols-4">
            {/* Budget */}
            <div>
              <FieldLabel
                htmlFor="budget"
                right={
                  <span className="app-badge">
                    ₹{budget.toLocaleString("en-IN")}
                  </span>
                }
              >
                Budget (₹)
              </FieldLabel>

              {/* Use the project's RangeSlider but also keep a fallback class */}
              <div className="mt-1">
                <RangeSlider
                  id="budget"
                  min={15000}
                  max={200000}
                  step={5000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="app-range"
                />
                <div className="mt-1 flex justify-between text-[0.6rem] text-slate-500 dark:text-slate-400">
                  <span>₹15k</span>
                  <span>₹2L+</span>
                </div>
              </div>
            </div>

            {/* Nights */}
            <div>
              <FieldLabel htmlFor="nights">Nights</FieldLabel>
              <div className="mt-1 flex items-center rounded-2xl border border-slate-200/10 dark:border-white/10 bg-white/20 dark:bg-black/20 px-3 py-2 text-xs">
                <button
                  type="button"
                  className="mr-2 rounded-full border border-slate-200/10 dark:border-white/10 px-2 py-0.5 text-xs text-slate-700 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-400"
                  onClick={() => setNights((n) => (n > 1 ? n - 1 : 1))}
                >
                  −
                </button>
                <input
                  id="nights"
                  type="number"
                  min={1}
                  max={15}
                  value={nights}
                  onChange={(e) =>
                    setNights(
                      Math.min(15, Math.max(1, Number(e.target.value) || 1))
                    )
                  }
                  className="app-input bg-transparent text-center text-sm text-slate-900 dark:text-slate-50 outline-none"
                />
                <button
                  type="button"
                  className="ml-2 rounded-full border border-slate-200/10 dark:border-white/10 px-2 py-0.5 text-xs text-slate-700 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-400"
                  onClick={() => setNights((n) => (n < 15 ? n + 1 : 15))}
                >
                  +
                </button>
              </div>
            </div>

            {/* Travellers */}
            <div>
              <FieldLabel htmlFor="travelers">Travellers</FieldLabel>
              <div className="mt-1 flex items-center rounded-2xl border border-slate-200/10 dark:border-white/10 bg-white/20 dark:bg-black/20 px-3 py-2 text-xs">
                <button
                  type="button"
                  className="mr-2 rounded-full border border-slate-200/10 dark:border-white/10 px-2 py-0.5 text-xs text-slate-700 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-400"
                  onClick={() => setTravelers((t) => (t > 1 ? t - 1 : 1))}
                >
                  −
                </button>
                <input
                  id="travelers"
                  type="number"
                  min={1}
                  max={10}
                  value={travelers}
                  onChange={(e) =>
                    setTravelers(
                      Math.min(10, Math.max(1, Number(e.target.value) || 1))
                    )
                  }
                  className="app-input bg-transparent text-center text-sm text-slate-900 dark:text-slate-50 outline-none"
                />
                <button
                  type="button"
                  className="ml-2 rounded-full border border-slate-200/10 dark:border-white/10 px-2 py-0.5 text-xs text-slate-700 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-400"
                  onClick={() => setTravelers((t) => (t < 10 ? t + 1 : 10))}
                >
                  +
                </button>
              </div>
            </div>

            {/* Place preference */}
            <div>
              <FieldLabel htmlFor="placePreference">
                Place preference
              </FieldLabel>
              <IconInput
                id="placePreference"
                icon="🔍"
                value={placePreference}
                onChange={(e) => setPlacePreference(e.target.value)}
                placeholder="Kolkata, heritage, river cruise..."
                className="mt-1 app-input"
              />
            </div>
          </div>

          {/* Vibe row (optional) */}
          {/* Uncomment if your tags include vibes — styles below are theme-aware */}
          {/* <div className="mt-4">
            <FieldLabel>Trip vibe</FieldLabel>
            <div className="mt-2 flex flex-wrap gap-2">
              {vibeOptions.map((v) => (
                <button
                  key={v.id}
                  className={`app-chip ${vibe === v.id ? "app-chip--active" : ""}`}
                  onClick={() => setVibe(v.id)}
                >
                  <span>{v.icon}</span>
                  <span className="ml-1">{v.label}</span>
                </button>
              ))}
            </div>
          </div> */}
        </div>

        {/* Results summary */}
        <div className="mt-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Showing trips for{" "}
            <span className="text-slate-900 dark:text-slate-50">
              ₹{budget.toLocaleString("en-IN")}
            </span>{" "}
            budget,{" "}
            <span className="text-slate-900 dark:text-slate-50">{nights}</span>{" "}
            nights,{" "}
            <span className="text-slate-900 dark:text-slate-50">
              {travelers}
            </span>{" "}
            traveller
            {travelers > 1 ? "s" : ""}.
          </p>
        </div>

        {/* Loading or results */}
        <div className="mt-4">
          {loading ? (
            <div className="text-center text-sm text-slate-600 dark:text-slate-400">
              Loading trips...
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state mt-4 rounded-3xl px-6 py-10">
              <div className="mb-3 text-3xl">🧳</div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                No trips exactly match this configuration.
              </p>
              <p className="mt-1 max-w-sm text-xs text-slate-600 dark:text-slate-400">
                Try increasing your budget, reducing nights, or clearing the
                place preference &amp; vibe filters to see more options.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filtered.map((destination) => (
                <DestinationCard
                  key={destination.id ?? destination.name}
                  destination={destination}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
