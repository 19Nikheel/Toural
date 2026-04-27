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
  const [tours, setTours] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const city = params.get("city");

  const { fetchTourByCity, loading } = useTour();

  useEffect(() => {
    if (city) {
      const fetchTours = async () => {
        const toursData = await fetchTourByCity(city);
        setTours(toursData);
      };
      fetchTours();
    }
  }, [city, fetchTourByCity]);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 md:px-6">
        <SectionHeader
          eyebrow="Explore places"
          title={`Top places in ${city}`}
          subtitle="Handpicked attractions based on popularity, reviews, and experience."
          action={
            <span className="text-[0.7rem] text-[#777]">
              {tours.length} result{tours.length !== 1 ? "s" : ""} found
            </span>
          }
        />

        <div className="mt-4">
          <p className="text-xs text-[#777]">
            Showing trips for searched location: <strong>{city}</strong>.
          </p>
        </div>

        <div className="mt-4">
          {loading ? (
            <div className="text-center text-sm text-[#777]">
              Loading trips...
            </div>
          ) : tours.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-[#F4A261]/30 bg-[#F4A261]/5 px-6 py-10 text-center">
              <div className="mb-3 text-3xl">🧳</div>
              <p className="text-sm font-medium text-[#1a1a1a]">
                No trips exactly match this configuration.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {tours.map((destination) => (
                <DestinationCard
                  key={destination.id ?? destination.name}
                  place={destination}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
