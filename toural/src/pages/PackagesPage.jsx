import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../context/axiosInstance";
import { useUser } from "../context/UserContext";

export default function PackagesPage() {
  const { user, isLoggedIn } = useUser();
  const navigate = useNavigate();

  const [cityInput, setCityInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [hotels, setHotels] = useState([]);
  const [guides, setGuides] = useState([]);
  const [cars, setCars] = useState([]);

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSearch = async () => {
    if (!cityInput.trim()) return;
    setLoading(true);
    setError("");
    setSelectedHotel(null);
    setSelectedGuide(null);
    setSelectedCar(null);
    setHotels([]);
    setGuides([]);
    setCars([]);

    try {
      // Fetch hotels
      const hotelRes = await axiosInstance.get(
        `/hotels/hotel-by-city/${cityInput.trim()}`
      );
      // Fetch guides
      const guideRes = await axiosInstance.get(
        `/guides/city-name/${cityInput.trim()}`
      );
      // Fetch cars
      const carRes = await axiosInstance.get(
        `/cars/city-name/${cityInput.trim()}`
      );

      setHotels(hotelRes.data || []);
      setGuides(guideRes.data || []);
      setCars(carRes.data || []);

      if (
        hotelRes.data?.length === 0 &&
        guideRes.data?.length === 0 &&
        carRes.data?.length === 0
      ) {
        setError("No package options found for this city. Try another city.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch package options. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedHotel) total += selectedHotel.price || 0;
    if (selectedGuide) total += selectedGuide.pricePerDay || 0;
    if (selectedCar) total += selectedCar.pricePerDay || 0;
    return total;
  };

  const handleBookPackage = () => {
    if (!isLoggedIn || !user) {
      navigate("/login", { state: { redirectTo: "/packages" } });
      return;
    }
    
    if (!selectedHotel) {
      alert("Please select at least a Hotel for your package.");
      return;
    }

    const items = [];
    items.push(`HOTEL:${selectedHotel.hotelId}`);
    if (selectedGuide) items.push(`GUIDE:${selectedGuide.guideId}`);
    if (selectedCar) items.push(`CAR:${selectedCar.carId}`);

    const packagePrice = calculateTotal();

    const packageData = {
      hotelName: selectedHotel.hotelName,
      cityName: selectedHotel.cityName,
    };

    navigate(`/checkout?type=PACKAGE&itemId=${items.join(",")}`, {
      state: { 
        packagePrice,
        packageData 
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header Area */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9622A] font-semibold">
            Custom Travel Packages
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">
            Build Your Perfect Trip
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Select a destination to find handpicked hotels, local guides, and
            rental cars. Combine them into a single booking for ultimate convenience.
          </p>

          <div className="mt-8 max-w-md mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Where are you going? (e.g. Jaipur)"
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
        {loading && (
          <div className="py-12 text-center text-slate-500">
            Searching for best options...
          </div>
        )}
        {error && (
          <div className="py-12 text-center text-red-500 bg-red-50 rounded-2xl border border-red-100">
            {error}
          </div>
        )}

        {!loading && (hotels.length > 0 || guides.length > 0 || cars.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Options List */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* HOTELS */}
              {hotels.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🏨</span>
                    <h2 className="text-xl font-bold">Step 1: Choose a Hotel</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {hotels.map((h) => (
                      <div
                        key={h.hotelId}
                        onClick={() => setSelectedHotel(h)}
                        className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                          selectedHotel?.hotelId === h.hotelId
                            ? "border-[#F4A261] bg-[#F4A261]/10 shadow-md ring-1 ring-[#F4A261]"
                            : "border-slate-200 bg-white hover:border-[#F4A261]/50"
                        }`}
                      >
                        <div className="h-32 mb-3 rounded-xl overflow-hidden bg-slate-200">
                           <img src="/hotel.jpg" alt="hotel" className="w-full h-full object-cover"/>
                        </div>
                        <h3 className="font-semibold line-clamp-1">{h.hotelName}</h3>
                        <p className="text-xs text-slate-500 mt-1">⭐ {h.rating || 4}/5</p>
                        <p className="text-[#C9622A] font-bold mt-2">
                          ₹{h.price?.toLocaleString("en-IN") || 1500} <span className="text-xs font-normal text-slate-500">/ night</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* GUIDES */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🗺️</span>
                  <h2 className="text-xl font-bold">Step 2: Add a Guide <span className="text-sm font-normal text-slate-500">(Optional)</span></h2>
                </div>
                {guides.length > 0 ? (
                  <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
                    {guides.map((g) => (
                      <div
                        key={g.guideId}
                        onClick={() => setSelectedGuide(selectedGuide?.guideId === g.guideId ? null : g)}
                        className={`cursor-pointer flex-none w-64 snap-start rounded-2xl border p-4 transition-all ${
                          selectedGuide?.guideId === g.guideId
                            ? "border-[#F4A261] bg-[#F4A261]/10 shadow-md ring-1 ring-[#F4A261]"
                            : "border-slate-200 bg-white hover:border-[#F4A261]/50"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xl">
                            👤
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">{g.name}</h3>
                            <p className="text-xs text-slate-500">⭐ {g.rating}/5</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-2">{g.specialization}</p>
                        <p className="text-[#C9622A] font-bold mt-auto">
                          ₹{g.pricePerDay?.toLocaleString("en-IN")} <span className="text-xs font-normal text-slate-500">/ day</span>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                    <p className="text-sm text-slate-500">No local guides available for this destination yet.</p>
                  </div>
                )}
              </section>

              {/* CARS */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🚘</span>
                  <h2 className="text-xl font-bold">Step 3: Rent a Car <span className="text-sm font-normal text-slate-500">(Optional)</span></h2>
                </div>
                {cars.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {cars.map((c) => (
                      <div
                        key={c.carId}
                        onClick={() => setSelectedCar(selectedCar?.carId === c.carId ? null : c)}
                        className={`cursor-pointer rounded-2xl border p-4 transition-all flex items-center gap-4 ${
                          selectedCar?.carId === c.carId
                            ? "border-[#F4A261] bg-[#F4A261]/10 shadow-md ring-1 ring-[#F4A261]"
                            : "border-slate-200 bg-white hover:border-[#F4A261]/50"
                        }`}
                      >
                        <div className="text-3xl bg-slate-100 p-3 rounded-xl">🚗</div>
                        <div>
                          <h3 className="font-semibold text-sm">{c.brand} {c.model}</h3>
                          <p className="text-xs text-slate-500">{c.type} • {c.fuelType}</p>
                          <p className="text-[#C9622A] font-bold mt-1">
                            ₹{c.pricePerDay?.toLocaleString("en-IN")} <span className="text-xs font-normal text-slate-500">/ day</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                    <p className="text-sm text-slate-500">No rental cars available for this destination yet.</p>
                  </div>
                )}
              </section>

            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4 border-b pb-4">Package Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {/* Hotel Selected */}
                  <div className="flex justify-between items-start text-sm">
                    <div>
                      <p className="font-medium">Hotel</p>
                      <p className="text-xs text-slate-500">{selectedHotel ? selectedHotel.hotelName : "Not selected"}</p>
                    </div>
                    <p className="font-semibold">
                      {selectedHotel ? `₹${(selectedHotel.price || 1500).toLocaleString("en-IN")}` : "₹0"}
                    </p>
                  </div>

                  {/* Guide Selected */}
                  <div className="flex justify-between items-start text-sm">
                    <div>
                      <p className="font-medium">Local Guide</p>
                      <p className="text-xs text-slate-500">{selectedGuide ? selectedGuide.name : "Not selected"}</p>
                    </div>
                    <p className="font-semibold">
                      {selectedGuide ? `₹${selectedGuide.pricePerDay.toLocaleString("en-IN")}` : "₹0"}
                    </p>
                  </div>

                  {/* Car Selected */}
                  <div className="flex justify-between items-start text-sm">
                    <div>
                      <p className="font-medium">Rental Car</p>
                      <p className="text-xs text-slate-500">{selectedCar ? `${selectedCar.brand} ${selectedCar.model}` : "Not selected"}</p>
                    </div>
                    <p className="font-semibold">
                      {selectedCar ? `₹${selectedCar.pricePerDay.toLocaleString("en-IN")}` : "₹0"}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-semibold text-slate-600">Total Price</p>
                    <p className="text-2xl font-bold text-[#C9622A]">
                      ₹{calculateTotal().toLocaleString("en-IN")}
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 text-right">Taxes & fees calculated at checkout</p>
                </div>

                <button
                  disabled={!selectedHotel}
                  onClick={handleBookPackage}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium transition hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400"
                >
                  Book This Package
                </button>
                {!selectedHotel && (
                  <p className="text-xs text-center text-red-500 mt-2">
                    * Please select a hotel first
                  </p>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
