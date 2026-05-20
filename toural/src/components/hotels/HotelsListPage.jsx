import { useEffect, useState } from "react";
import HotelDetails from "./HotelDetails";
import axiosInstance from "../../context/axiosInstance";

export default function HotelsResultsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [hasPool, setHasPool] = useState("any");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const fetchHotels = async () => {
    if (!cityInput.trim()) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        city: cityInput,
        page,
        limit,
        search,
        rating: minRating,
        hasPool,
      });

      const res = await axiosInstance.get(
        `/hotels/filter?${params.toString()}`,
      );

      const data = await res.data;

      setHotels(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [page, search, minRating, hasPool]);

  const handleCitySearch = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      fetchHotels();
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 pb-12 pt-6">
        {/* 🔷 HEADER */}
        <div className="mb-6">
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

        {/* 🔷 FILTER BAR */}
        <div className="mb-6 rounded-2xl border border-[#F4A261]/20 bg-white/80 backdrop-blur-md p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-4">
            {/* CITY SEARCH */}
            <input
              type="text"
              placeholder="Enter city..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={handleCitySearch}
              className="w-full rounded-xl border border-[#F4A261]/30 px-3 py-2 text-sm outline-none focus:border-[#F4A261]"
            />

            {/* HOTEL SEARCH */}
            <input
              type="text"
              placeholder="Search hotel..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-[#F4A261]/30 px-3 py-2 text-sm outline-none focus:border-[#F4A261]"
            />

            {/* RATING FILTER */}
            <select
              value={minRating}
              onChange={(e) => {
                setMinRating(Number(e.target.value));
                setPage(1);
              }}
              className="w-full rounded-xl border border-[#F4A261]/30 px-3 py-2 text-sm"
            >
              <option value={0}>All ratings</option>
              <option value={3}>3+ stars</option>
              <option value={4}>4+ stars</option>
            </select>

            {/* POOL FILTER */}
            <select
              value={hasPool}
              onChange={(e) => {
                setHasPool(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-[#F4A261]/30 px-3 py-2 text-sm"
            >
              <option value="any">Pool: Any</option>
              <option value="yes">With Pool</option>
              <option value="no">No Pool</option>
            </select>
          </div>
        </div>

        {/* 🔷 RESULT COUNT */}
        <div className="mb-5 text-xs text-[#777]">
          {hotels.length} result{hotels.length !== 1 ? "s" : ""} found
        </div>

        {/* 🔷 CONTENT */}
        {loading ? (
          <div className="flex justify-center py-10 text-sm text-[#777]">
            Loading hotels...
          </div>
        ) : hotels.length === 0 ? (
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
          <>
            {/* 🔷 GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <HotelDetails key={hotel.hotelId} hotel={hotel} />
              ))}
            </div>

            {/* 🔷 PAGINATION */}
            <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
              {/* PREV */}
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 rounded-lg border text-sm disabled:opacity-40"
              >
                Prev
              </button>

              {/* PAGE NUMBERS */}
              {[...Array(totalPages)].map((_, i) => {
                if (
                  i < 2 ||
                  i > totalPages - 3 ||
                  Math.abs(i + 1 - page) <= 1
                ) {
                  return (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        page === i + 1 ? "bg-[#F4A261] text-white" : "border"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                }

                if (i === 2 || i === totalPages - 3) {
                  return (
                    <span key={i} className="px-1">
                      ...
                    </span>
                  );
                }

                return null;
              })}

              {/* NEXT */}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 rounded-lg border text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
