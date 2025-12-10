import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import FieldLabel from "../ui/FieldLabel";
import RangeSlider from "../ui/RangeSlider";
import IconInput from "../ui/IconInput";
import Button from "../ui/Button";
import IconBadge from "../ui/IconBadge";
import axiosInstance from "../../context/axiosInstance";

// const VIBES = [
//   { id: "any", label: "Any", icon: "✨" },
//   { id: "beach", label: "Beach", icon: "🏖️" },
//   { id: "mountain", label: "Mountains", icon: "⛰️" },
//   { id: "city", label: "City life", icon: "🌆" },
//   { id: "romantic", label: "Romantic", icon: "💖" },
//   { id: "adventure", label: "Adventure", icon: "🎒" },
// ];

const TripPlannerCard = () => {
  const [budget, setBudget] = useState(50000);
  const [place, setPlace] = useState("");
  const [vibe, setVibe] = useState("any");
  const navigate = useNavigate();

  // const primaryVibes = VIBES.slice(0, 3);
  // const secondaryVibes = VIBES.slice(3);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let p = place.trim();
      p = p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
      const response = await axiosInstance.get(`/city/city-name/${p}`);
      console.log(response.data);
      navigate(`/results?cityCode=${response.data.cityCode}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="mt-6 md:p-6">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Search by place
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 md:text-base">
            Find stays & experiences around a destination you love
          </p>
        </div>
        <span className="text-[0.7rem] text-slate-500 dark:text-slate-400">
          Type a city, region or country →
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <FieldLabel htmlFor="place">Destination</FieldLabel>
          <IconInput
            id="place"
            icon="📍"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Shimla, Manali..."
            className="mt-1"
          />
          <p className="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
            Search by city, region or country. We’ll match the best trips for
            that area.
          </p>
        </div>

        <div className="md:col-span-1">
          <FieldLabel
            htmlFor="budget"
            right={
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.65rem] text-emerald-600 dark:bg-slate-800 dark:text-emerald-300">
                ₹{budget.toLocaleString("en-IN")}
              </span>
            }
          >
            Approx budget (₹)
          </FieldLabel>
          <RangeSlider
            id="budget"
            min={10000}
            max={200000}
            step={5000}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="mt-2"
          />
          <div className="mt-1 flex justify-between text-[0.65rem] text-slate-500 dark:text-slate-400">
            <span>₹10k</span>
            <span>₹2L+</span>
          </div>
        </div>
      </div>

      {/* Vibe row */}
      {/* <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <FieldLabel>Trip vibe (optional)</FieldLabel>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {primaryVibes.map((v) => (
              <SelectableChip
                key={v.id}
                active={vibe === v.id}
                onClick={() => setVibe(v.id)}
                className="flex-1 min-w-[90px]"
              >
                <span>{v.icon}</span>
                <span>{v.label}</span>
              </SelectableChip>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-1 text-[0.7rem] text-slate-400">
            {secondaryVibes.map((v) => {
              const active = v.id === vibe;
              const base =
                "rounded-full border px-2 py-0.5 transition flex items-center gap-1";
              const state = active
                ? "border-emerald-400 bg-emerald-400/10 text-emerald-600 dark:text-emerald-200"
                : "border-slate-200 bg-transparent text-slate-600 hover:border-emerald-400/60 dark:border-white/10 dark:text-slate-300";

              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVibe(v.id)}
                  className={`${base} ${state}`}
                >
                  <span>{v.icon}</span>
                  <span>{v.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div> */}

      {/* Footer */}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-200/70 pt-3 text-[0.8rem] text-slate-600 dark:border-white/10 dark:text-slate-300 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-2">
          <IconBadge>
            <span>✓</span>
          </IconBadge>
          <p className="text-[0.78rem] leading-relaxed">
            We’ll suggest{" "}
            <span className="text-emerald-600 dark:text-emerald-300">
              stays
            </span>{" "}
            and{" "}
            <span className="text-emerald-600 dark:text-emerald-300">
              top tourist spots
            </span>{" "}
            around{" "}
            <span className="font-medium text-slate-800 dark:text-slate-100">
              {place || "your chosen destination"}
            </span>{" "}
            within your budget.
          </p>
        </div>

        <Button
          size="md"
          className="mt-1 w-full justify-center md:mt-0 md:w-auto"
          onClick={handleSearch}
        >
          Search trips by place
          <span className="text-sm">➜</span>
        </Button>
      </div>
    </Card>
  );
};

export default TripPlannerCard;
