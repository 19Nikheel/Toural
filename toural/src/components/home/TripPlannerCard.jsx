import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import FieldLabel from "../ui/FieldLabel";
import RangeSlider from "../ui/RangeSlider";
import IconInput from "../ui/IconInput";
import Button from "../ui/Button";
import IconBadge from "../ui/IconBadge";
import axiosInstance from "../../context/axiosInstance";

const TripPlannerCard = () => {
  const [budget, setBudget] = useState(50000);
  const [place, setPlace] = useState("");
  const [vibe, setVibe] = useState("any");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let p = place.trim();
      p = p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
      navigate(`/results?city=${p}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="mt-6 md:p-6 relative border border-[#F4A261]/20 bg-white/80 backdrop-blur-[24px] rounded-2xl shadow-[0_8px_32px_rgba(244,162,97,0.15)] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(244,162,97,0.08)]">
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
          <p className="mt-1 text-[0.7rem] text-[#777]">
            Search by city, region or country. We’ll match the best trips for
            that area.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[#F4A261]/20 pt-4 text-[0.8rem] text-[#555] md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F4A261]/10 border border-[#F4A261]/20 text-[#C9622A]">
            <span>✓</span>
          </div>

          <p className="text-[0.78rem] leading-relaxed">
            We’ll suggest <span className="text-[#C9622A]">stays</span> and{" "}
            <span className="text-[#C9622A]">top tourist spots</span> around{" "}
            <span className="font-medium text-[#1a1a1a]">
              {place || "your chosen destination"}
            </span>
          </p>
        </div>

        <Button
          size="md"
          className="mt-1 w-full justify-center md:mt-0 md:w-auto bg-[#F4A261] text-white shadow-[0_4px_14px_rgba(244,162,97,0.4)] hover:bg-[#e8903e] hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(244,162,97,0.5)] transition-all duration-200"
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
