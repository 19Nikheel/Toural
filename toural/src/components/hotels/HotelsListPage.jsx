import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import HotelDetails from "./HotelDetails";

export default function HotelsResultsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔷 filters
  const [search, setSearch] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [hasPool, setHasPool] = useState("any");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cityFromUrl = params.get("city");

  // 🔷 initial load from URL
  useEffect(() => {
    if (cityFromUrl) {
      setCityInput(cityFromUrl);
      fetchHotels(cityFromUrl);
    }
  }, [cityFromUrl]);

  // 🔷 API CALL
  const fetchHotels = async (city) => {
    if (!city) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8084/hotels/hotel-by-city/${city}`,
      );
      const data = await res.json();
      setHotels(data);
    } catch (err) {
      console.error(err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔷 ENTER SEARCH (CITY SEARCH)
  const handleCitySearch = (e) => {
    if (e.key === "Enter") {
      fetchHotels(cityInput);
    }
  };

  // 🔷 FILTER LOGIC
  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const textMatch =
        hotel.hotelName?.toLowerCase().includes(search.toLowerCase()) ||
        hotel.cityName?.toLowerCase().includes(search.toLowerCase()) ||
        hotel.stateName?.toLowerCase().includes(search.toLowerCase());

      const ratingMatch = hotel.rating >= minRating;

      const poolMatch =
        hasPool === "any"
          ? true
          : hasPool === "yes"
            ? hotel.hasPool === true
            : hotel.hasPool === false;

      return textMatch && ratingMatch && poolMatch;
    });
  }, [hotels, search, minRating, hasPool]);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 md:px-6">
        {/* 🔷 HEADER */}
        <div className="mb-6 space-y-1">
          <p className="text-xs text-[#C9622A] uppercase tracking-[0.18em]">
            Explore stays
          </p>
          <h1 className="text-2xl md:text-3xl font-serif font-semibold">
            Hotels
          </h1>
          <p className="text-sm text-[#777]">
            Search by city and filter your perfect stay.
          </p>
        </div>

        {/* 🔷 SEARCH BAR */}
        <div className="mb-6 rounded-2xl border border-[#F4A261]/20 bg-white/80 backdrop-blur-md p-4 shadow-sm flex flex-col gap-3 md:flex-row md:items-center">
          {/* 🔍 CITY SEARCH (API TRIGGER) */}
          <input
            type="text"
            placeholder="Enter city and press Enter..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={handleCitySearch}
            className="w-full md:w-[40%] rounded-xl border border-[#F4A261]/30 px-3 py-2 text-sm outline-none focus:border-[#F4A261]"
          />

          {/* 🔍 LOCAL SEARCH */}
          <input
            type="text"
            placeholder="Search hotel name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[30%] rounded-xl border border-[#F4A261]/30 px-3 py-2 text-sm outline-none focus:border-[#F4A261]"
          />

          {/* ⭐ RATING */}
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="rounded-xl border border-[#F4A261]/30 px-3 py-2 text-sm"
          >
            <option value={0}>All ratings</option>
            <option value={2}>2+ stars</option>
            <option value={3}>3+ stars</option>
            <option value={4}>4+ stars</option>
          </select>

          {/* 🏊 POOL */}
          <select
            value={hasPool}
            onChange={(e) => setHasPool(e.target.value)}
            className="rounded-xl border border-[#F4A261]/30 px-3 py-2 text-sm"
          >
            <option value="any">Pool: Any</option>
            <option value="yes">With Pool</option>
            <option value="no">No Pool</option>
          </select>
        </div>

        {/* 🔷 RESULT COUNT */}
        <div className="mb-5 text-xs text-[#777]">
          {filteredHotels.length} result
          {filteredHotels.length !== 1 ? "s" : ""} found
        </div>

        {/* 🔷 CONTENT */}
        {loading ? (
          <div className="flex justify-center py-10 text-sm text-[#777]">
            Loading hotels...
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-[#F4A261]/30 bg-[#F4A261]/5 p-10 text-center">
            <div className="text-3xl mb-2">🏨</div>
            <p className="text-sm font-medium text-[#1a1a1a]">
              No hotels found
            </p>
            <p className="text-xs text-[#777] mt-1">
              Try another city or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredHotels.map((hotel) => (
              <HotelDetails key={hotel.hotelId} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
