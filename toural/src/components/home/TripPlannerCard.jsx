import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import FieldLabel from "../ui/FieldLabel";
import IconInput from "../ui/IconInput";
import Button from "../ui/Button";

const TripPlannerCard = () => {
  const [place, setPlace] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!place.trim()) return;

    let p = place.trim();
    p = p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();

    navigate(`/results?city=${p}`);
  };

  return (
    <Card className="mt-6 md:p-6 relative border border-[#F4A261]/20 bg-white/80 backdrop-blur-[24px] rounded-2xl shadow-[0_8px_32px_rgba(244,162,97,0.15)]">
      {/* 🔷 HEADER */}
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[#C9622A]">
            Search by place
          </p>
          <p className="text-sm font-semibold text-[#1a1a1a] md:text-base">
            Find stays & experiences around a destination you love
          </p>
        </div>

        <span className="text-[0.7rem] text-[#777]">
          Discover handpicked stays and experiences →
        </span>
      </div>

      {/* 🔷 INPUT SECTION */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <FieldLabel htmlFor="place">Destination</FieldLabel>

          <div className="relative mt-1">
            <IconInput
              id="place"
              icon="📍"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Shimla, Manali, Delhi..."
              className="pr-10"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            {/* subtle hint icon */}
            {place && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#777]">
                ↵
              </span>
            )}
          </div>

          <p className="mt-1 text-[0.7rem] text-[#777]">
            Search by city, region or country. We’ll match the best trips for
            that area.
          </p>
        </div>
      </div>

      {/* 🔷 FOOTER */}
      <div className="mt-6 flex flex-col gap-3 border-t border-[#F4A261]/20 pt-4 text-[0.8rem] text-[#555] md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F4A261]/10 border border-[#F4A261]/20 text-[#C9622A]">
            ✓
          </div>

          <p className="text-[0.78rem] leading-relaxed">
            We’ll suggest <span className="text-[#C9622A]">stays</span> and{" "}
            <span className="text-[#C9622A]">top tourist spots</span> around{" "}
            <span className="font-medium text-[#1a1a1a]">
              {place || "your chosen destination"}
            </span>
          </p>
        </div>

        {/* 🔷 BUTTON */}
        <Button
          size="md"
          disabled={!place.trim()}
          onClick={handleSearch}
          className={`mt-1 w-full md:w-auto justify-center transition-all duration-200
            ${
              place.trim()
                ? "bg-[#F4A261] text-white hover:bg-[#e8903e] hover:-translate-y-[1px] shadow-[0_6px_20px_rgba(244,162,97,0.4)]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Search trips
          <span className="text-sm">➜</span>
        </Button>
      </div>
    </Card>
  );
};

export default TripPlannerCard;
