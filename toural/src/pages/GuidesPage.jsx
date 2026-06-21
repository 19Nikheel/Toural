import React, { useState } from "react";
import axiosInstance from "../context/axiosInstance";

export default function GuidesPage() {
  const [cityInput, setCityInput] = useState("");
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!cityInput.trim()) return;
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await axiosInstance.get(`/guides/city-name/${cityInput.trim()}`);
      setGuides(res.data || []);
    } catch (err) {
      console.error(err);
      setGuides([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9622A] font-semibold">
            Local Experts
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">
            Find a Tourist Guide
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Discover the best local guides to make your trip unforgettable.
          </p>

          <div className="mt-8 max-w-md mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Search by city (e.g. Jaipur)"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#F4A261] focus:ring-1 focus:ring-[#F4A261]"
            />
            <button
              onClick={handleSearch}
              className="rounded-xl bg-[#F4A261] px-6 py-3 font-semibold text-white transition hover:bg-[#e8903e]"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        {loading && <div className="py-12 text-center text-slate-500">Searching guides...</div>}
        
        {!loading && hasSearched && guides.length === 0 && (
          <div className="py-12 text-center rounded-2xl border border-dashed border-slate-300 bg-white">
            <p className="text-slate-500">No guides found in {cityInput}. Try another city.</p>
          </div>
        )}

        {!loading && guides.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {guides.map((g) => (
              <div key={g.guideId} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{g.name}</h3>
                    <p className="text-sm text-slate-500">⭐ {g.rating}/5</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">{g.specialization}</p>
                <div className="flex justify-between items-end mt-auto pt-4 border-t">
                  <p className="text-[#C9622A] font-bold text-xl">
                    ₹{g.pricePerDay?.toLocaleString("en-IN")} <span className="text-xs font-normal text-slate-500">/ day</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
