// src/components/results/ResultsPage.jsx
import React, { useMemo, useState } from "react";
import FieldLabel from "../components/ui/FieldLabel";
import RangeSlider from "../components/ui/RangeSlider";
import IconInput from "../components/ui/IconInput";
import SelectableChip from "../components/ui/SelectableChip";
import DestinationCard from "../components/results/DestinationCard";
import SectionHeader from "../components/ui/SectionHeader";

const DESTINATIONS = [
  {
    id: 1,
    name: "Goa Getaway",
    country: "India",
    region: "Beach",
    heroColor: "from-orange-500/80 via-pink-500/80 to-sky-500/80",
    suggestedNights: 3,
    activityCostPerPerson: 2000,
    tags: ["beach", "nightlife", "water sports", "party"],
    bestSeason: "Nov – Feb",
    stayOptions: [
      {
        name: "Sea Breeze Boutique Hotel",
        type: "Hotel",
        rating: 4.5,
        pricePerNight: 3500,
        perks: ["Breakfast included", "Pool", "Near Baga Beach"],
      },
      {
        name: "Sunset Bay Homestay",
        type: "Homestay",
        rating: 4.3,
        pricePerNight: 2800,
        perks: ["Wi-Fi", "Kitchen access"],
      },
    ],
    highlights: [
      "Baga & Calangute Beach",
      "Fort Aguada",
      "Chapora Fortress",
      "Club Tito’s & Café Mambo",
    ],
  },
  {
    id: 2,
    name: "Manali Escape",
    country: "India",
    region: "Mountains",
    heroColor: "from-sky-500/80 via-emerald-500/80 to-slate-800/80",
    suggestedNights: 4,
    activityCostPerPerson: 2500,
    tags: ["mountains", "snow", "romantic", "adventure"],
    bestSeason: "Oct – Mar",
    stayOptions: [
      {
        name: "Pine View Resort",
        type: "Resort",
        rating: 4.6,
        pricePerNight: 3200,
        perks: ["Mountain view", "Bonfire"],
      },
      {
        name: "Old Manali Hostel",
        type: "Hostel",
        rating: 4.2,
        pricePerNight: 900,
        perks: ["Backpacker vibe", "Café"],
      },
    ],
    highlights: [
      "Hadimba Temple",
      "Solang Valley",
      "Old Manali cafes",
      "Rohtang Pass (seasonal)",
    ],
  },
  {
    id: 3,
    name: "Jaipur Heritage Trail",
    country: "India",
    region: "City",
    heroColor: "from-amber-500/80 via-rose-500/80 to-slate-900/80",
    suggestedNights: 3,
    activityCostPerPerson: 1800,
    tags: ["heritage", "culture", "family", "shopping"],
    bestSeason: "Oct – Mar",
    stayOptions: [
      {
        name: "Hawa Mahal View Hotel",
        type: "Hotel",
        rating: 4.4,
        pricePerNight: 2600,
        perks: ["City view", "Breakfast"],
      },
      {
        name: "Old Haveli Stay",
        type: "Heritage stay",
        rating: 4.7,
        pricePerNight: 4200,
        perks: ["Traditional décor", "Rooftop dinner"],
      },
    ],
    highlights: [
      "Amber Fort & Light Show",
      "Hawa Mahal",
      "City Palace",
      "Johari Bazaar shopping",
    ],
  },
  {
    id: 4,
    name: "Kerala Backwater Bliss",
    country: "India",
    region: "Backwaters",
    heroColor: "from-emerald-500/80 via-teal-500/80 to-slate-900/80",
    suggestedNights: 3,
    activityCostPerPerson: 2200,
    tags: ["backwaters", "nature", "relaxing", "family"],
    bestSeason: "Sep – Mar",
    stayOptions: [
      {
        name: "Premium Houseboat",
        type: "Houseboat",
        rating: 4.8,
        pricePerNight: 6500,
        perks: ["All meals", "Private deck"],
      },
      {
        name: "Lakeside Resort",
        type: "Resort",
        rating: 4.5,
        pricePerNight: 3800,
        perks: ["Ayurvedic spa", "Lake view"],
      },
    ],
    highlights: [
      "Alleppey backwater cruise",
      "Kumarakom bird sanctuary",
      "Local village walk",
    ],
  },
  {
    id: 5,
    name: "Dubai City Lights",
    country: "UAE",
    region: "International",
    heroColor: "from-indigo-500/80 via-fuchsia-500/80 to-slate-900/80",
    suggestedNights: 4,
    activityCostPerPerson: 9000,
    tags: ["international", "luxury", "shopping", "family"],
    bestSeason: "Nov – Mar",
    stayOptions: [
      {
        name: "Downtown Skyline Hotel",
        type: "Hotel",
        rating: 4.7,
        pricePerNight: 9500,
        perks: ["Near Burj Khalifa", "Infinity pool"],
      },
      {
        name: "Marina View Apartments",
        type: "Apartment",
        rating: 4.5,
        pricePerNight: 7800,
        perks: ["Kitchen", "Marina walk"],
      },
    ],
    highlights: [
      "Burj Khalifa & Dubai Mall",
      "Desert safari",
      "Dubai Marina",
      "Global Village (seasonal)",
    ],
  },
];

function calculateTripCost(destination, nights, travelers) {
  if (!destination.stayOptions || destination.stayOptions.length === 0) {
    return 0;
  }
  const totalStay = destination.stayOptions.reduce(
    (sum, stay) => sum + stay.pricePerNight,
    0
  );
  const avgStayPerNight = totalStay / destination.stayOptions.length;
  const baseActivitiesPerPerson =
    destination.activityCostPerPerson != null
      ? destination.activityCostPerPerson
      : 1500;

  const total =
    travelers * (avgStayPerNight * nights + baseActivitiesPerPerson);

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

  const filtered = useMemo(() => {
    return DESTINATIONS.map((d) => {
      const totalTripCost = calculateTripCost(d, nights, travelers);
      const perPersonCost =
        travelers > 0 ? Math.round(totalTripCost / travelers) : totalTripCost;

      const query = placePreference.trim().toLowerCase();
      const matchesLocation =
        !query ||
        d.name.toLowerCase().includes(query) ||
        d.country.toLowerCase().includes(query) ||
        d.region.toLowerCase().includes(query) ||
        d.tags.some((t) => t.toLowerCase().includes(query));

      const matchesVibe =
        vibe === "any" || d.tags.some((t) => t.toLowerCase() === vibe);

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
  }, [budget, nights, travelers, placePreference, vibe]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-10 pt-6 md:px-6">
        {/* Filters header */}
        <SectionHeader
          eyebrow="Your trip blueprint"
          title="Tailored destinations matching your budget & vibe"
          subtitle={`Adjust filters to refine where you stay & what you see.`}
          action={
            <span className="text-[0.7rem] text-slate-400">
              {filtered.length} match{filtered.length !== 1 ? "es" : ""} found
            </span>
          }
        />

        {/* Filter controls */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="grid gap-3 md:grid-cols-4">
            {/* Budget */}
            <div>
              <FieldLabel
                htmlFor="budget"
                right={
                  <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[0.65rem] text-emerald-300">
                    ₹{budget.toLocaleString("en-IN")}
                  </span>
                }
              >
                Budget (₹)
              </FieldLabel>
              <RangeSlider
                id="budget"
                min={15000}
                max={200000}
                step={5000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="mt-1"
              />
              <div className="mt-1 flex justify-between text-[0.6rem] text-slate-400">
                <span>₹15k</span>
                <span>₹2L+</span>
              </div>
            </div>

            {/* Nights */}
            <div>
              <FieldLabel htmlFor="nights">Nights</FieldLabel>
              <div className="mt-1 flex items-center rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-xs">
                <button
                  type="button"
                  className="mr-2 rounded-full border border-white/10 px-2 py-0.5 text-xs text-slate-300 hover:border-emerald-400 hover:text-emerald-300"
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
                  className="w-full bg-transparent text-center text-sm text-slate-50 outline-none"
                />
                <button
                  type="button"
                  className="ml-2 rounded-full border border-white/10 px-2 py-0.5 text-xs text-slate-300 hover:border-emerald-400 hover:text-emerald-300"
                  onClick={() => setNights((n) => (n < 15 ? n + 1 : 15))}
                >
                  +
                </button>
              </div>
            </div>

            {/* Travellers */}
            <div>
              <FieldLabel htmlFor="travelers">Travellers</FieldLabel>
              <div className="mt-1 flex items-center rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-xs">
                <button
                  type="button"
                  className="mr-2 rounded-full border border-white/10 px-2 py-0.5 text-xs text-slate-300 hover:border-emerald-400 hover:text-emerald-300"
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
                  className="w-full bg-transparent text-center text-sm text-slate-50 outline-none"
                />
                <button
                  type="button"
                  className="ml-2 rounded-full border border-white/10 px-2 py-0.5 text-xs text-slate-300 hover:border-emerald-400 hover:text-emerald-300"
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
                placeholder="Goa, mountains, Dubai, beach..."
                className="mt-1"
              />
            </div>
          </div>

          {/* Vibe row */}
          {/* <div className="mt-4">
            <FieldLabel>Trip vibe</FieldLabel>
            <div className="mt-2 flex flex-wrap gap-2">
              {vibeOptions.map((v) => (
                <SelectableChip
                  key={v.id}
                  active={vibe === v.id}
                  onClick={() => setVibe(v.id)}
                >
                  <span>{v.icon}</span>
                  <span>{v.label}</span>
                </SelectableChip>
              ))}
            </div>
          </div> */}
        </div>

        {/* Results summary */}
        <div>
          <p className="text-xs text-slate-400">
            Showing trips for{" "}
            <span className="text-slate-200">
              ₹{budget.toLocaleString("en-IN")}
            </span>{" "}
            budget, <span className="text-slate-200">{nights}</span> nights,{" "}
            <span className="text-slate-200">{travelers}</span> traveller
            {travelers > 1 ? "s" : ""}.
          </p>
        </div>

        {/* Results grid */}
        {filtered.length === 0 ? (
          <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-10 text-center">
            <div className="mb-3 text-3xl">🧳</div>
            <p className="text-sm font-medium text-slate-100">
              No trips exactly match this configuration.
            </p>
            <p className="mt-1 max-w-sm text-xs text-slate-400">
              Try increasing your budget, reducing nights, or clearing the place
              preference &amp; vibe filters to see more options.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map((d) => (
              <DestinationCard
                key={d.id}
                destination={d}
                totalTripCost={d.totalTripCost}
                perPersonCost={d.perPersonCost}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
