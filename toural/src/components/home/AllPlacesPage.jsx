import React, { useEffect, useState } from "react";
import FeaturedTripCard from "./FeaturedTripCard";
import axiosInstance from "../../context/axiosInstance";

export default function AllPlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔷 filters (API driven)
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [minRating, setMinRating] = useState(0);

  // 🔷 pagination (API driven)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  // 🔷 API CALL (core change)
  const fetchPlaces = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page,
        limit,
        search,
        type: typeFilter !== "all" ? typeFilter : "",
        rating: minRating,
      });

      const res = await axiosInstance.get(`/tours/filter?${params.toString()}`);
      if (res.status === 200) {
        setPlaces(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      }
      // expected response:
      // { data: [...], totalPages: X }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 whenever filter/page changes → API call
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchPlaces();
    }, 400);

    return () => clearTimeout(delay);
  }, [page, search, typeFilter, minRating]);

  // 🔷 helper (add above return)
  const getVisiblePages = () => {
    const pages = [];

    const startPages = [1, 2, 3];
    const endPages = [totalPages - 2, totalPages - 1, totalPages];
    const currentGroup = [page - 1, page, page + 1];

    const add = (p) => {
      if (p >= 1 && p <= totalPages && !pages.includes(p)) {
        pages.push(p);
      }
    };

    startPages.forEach(add);
    currentGroup.forEach(add);
    endPages.forEach(add);

    return pages.sort((a, b) => a - b);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* 🔷 FILTER BAR */}
      <div className="rounded-2xl border border-[#F4A261]/20 bg-white/80 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search place, city..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page
          }}
          className="w-full md:w-[40%] rounded-xl border border-[#F4A261]/30 px-3 py-2 text-sm outline-none focus:border-[#F4A261]"
        />

        {/* TYPE */}
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-[#F4A261]/30 px-3 py-2 text-sm"
        >
          <option value="all">All Types</option>

          {/* Historical */}
          <option value="Historical">Historical</option>
          <option value="Monument">Monument</option>
          <option value="Fort">Fort</option>
          <option value="War Memorial">War Memorial</option>
          <option value="Museum">Museum</option>

          {/* Religious */}
          <option value="Temple">Temple</option>
          <option value="Mosque">Mosque</option>
          <option value="Church">Church</option>
          <option value="Gurudwara">Gurudwara</option>

          {/* Nature */}
          <option value="Nature">Nature</option>
          <option value="Hill Station">Hill Station</option>
          <option value="Waterfall">Waterfall</option>
          <option value="Lake">Lake</option>
          <option value="Forest">Forest</option>

          {/* Leisure */}
          <option value="Beach">Beach</option>
          <option value="Park">Park</option>
          <option value="Zoo">Zoo</option>
          <option value="Amusement Park">Amusement Park</option>

          {/* Urban */}
          <option value="Market">Market</option>
          <option value="Shopping">Shopping</option>
          <option value="City Attraction">City Attraction</option>
        </select>

        {/* RATING */}
        <select
          value={minRating}
          onChange={(e) => {
            setMinRating(Number(e.target.value));
            setPage(1);
          }}
          className="rounded-xl border border-[#F4A261]/30 px-3 py-2 text-sm"
        >
          <option value={0}>All ratings</option>
          <option value={3}>3+ stars</option>
          <option value={4}>4+ stars</option>
          <option value={4.5}>4.5+ stars</option>
        </select>
      </div>

      {/* 🔷 CONTENT */}
      {loading ? (
        <div className="text-center text-[#777] mt-10">Loading places...</div>
      ) : places.length === 0 ? (
        <div className="text-center text-[#777] mt-10">No places found</div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {places.map((place) => (
              <FeaturedTripCard key={place.uniq_id} place={place} />
            ))}
          </div>

          {/* 🔷 PAGINATION */}
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            {/* PREV */}
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded-lg border text-sm disabled:opacity-40"
            >
              Prev
            </button>

            {getVisiblePages().map((p, i, arr) => (
              <React.Fragment key={p}>
                {/* dots */}
                {i > 0 && p - arr[i - 1] > 1 && (
                  <span className="px-2 text-[#777]">...</span>
                )}

                <button
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    page === p ? "bg-[#F4A261] text-white" : "border"
                  }`}
                >
                  {p}
                </button>
              </React.Fragment>
            ))}

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
    </section>
  );
}
