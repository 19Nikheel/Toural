import React, { useState } from "react";
import axiosInstance from "../context/axiosInstance";

export default function CarsPage() {
  const [cityInput, setCityInput] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!cityInput.trim()) return;
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await axiosInstance.get(`/cars/city-name/${cityInput.trim()}`);
      setCars(res.data || []);
    } catch (err) {
      console.error(err);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9622A] font-semibold">
            Transportation
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">
            Rent a Car
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Find reliable vehicles for your journey, from economical hatchbacks to luxury sedans.
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
        {loading && <div className="py-12 text-center text-slate-500">Searching cars...</div>}
        
        {!loading && hasSearched && cars.length === 0 && (
          <div className="py-12 text-center rounded-2xl border border-dashed border-slate-300 bg-white">
            <p className="text-slate-500">No cars found in {cityInput}. Try another city.</p>
          </div>
        )}

        {!loading && cars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {cars.map((c) => (
              <div key={c.carId} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl">
                    🚗
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{c.brand} {c.model}</h3>
                    <p className="text-sm text-slate-500">{c.type} • {c.fuelType}</p>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-auto pt-4 border-t">
                  <p className="text-[#C9622A] font-bold text-xl">
                    ₹{c.pricePerDay?.toLocaleString("en-IN")} <span className="text-xs font-normal text-slate-500">/ day</span>
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
