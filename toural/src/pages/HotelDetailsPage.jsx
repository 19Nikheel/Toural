import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/ui/Card";
import RatingStars from "../components/ui/RatingStars";
import { useTour } from "../context/TourContext";

const HotelDetailsPage = () => {
  const { tours } = useTour();
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const hotel = useMemo(() => {
    if (!Array.isArray(hotels)) return null;
    return hotels.find((h) => h.hotelId === hotelId) || null;
  }, [hotels, hotelId]);
  if (!hotel) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          Hotel not found
        </p>
        <p className="text-[0.85rem] text-slate-500 dark:text-slate-400">
          We couldn&apos;t find this hotel in the current list. Try going back
          to the trip page and selecting it again.
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-2 text-[0.8rem] text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-300"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 pb-10 pt-6 md:px-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-emerald-400">
            Hotel
          </p>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {hotel.hotelName}
          </h1>
          <p className="mt-1 text-[0.8rem] text-slate-600 dark:text-slate-300">
            📍 {hotel.addressLine}, {hotel.cityName} {hotel.zipcode}
          </p>
          <p className="mt-0.5 text-[0.75rem] text-slate-500 dark:text-slate-400">
            Plus code: {hotel.plusCode}
          </p>
          <div className="mt-2 flex items-center gap-2 text-[0.85rem]">
            <RatingStars rating={hotel.rating} />
            <span className="text-[0.75rem] text-slate-500 dark:text-slate-300">
              {hotel.rating?.toFixed(1)} / 5
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full border border-slate-300 px-3 py-1 text-[0.75rem] text-slate-600 hover:border-emerald-400 hover:text-emerald-500 dark:border-slate-700 dark:text-slate-300"
        >
          ⬅ Back
        </button>
      </div>

      {/* Images */}
      {hotel.images?.length > 0 && (
        <div className="grid gap-3 md:grid-cols-3">
          <img
            src={hotel.images[0]}
            alt={hotel.hotelName}
            className="h-52 w-full rounded-2xl object-cover md:col-span-2"
          />
          <div className="flex flex-col gap-3">
            {hotel.images.slice(1, 3).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${hotel.hotelName}-${idx}`}
                className="h-24 w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      )}

      {/* Description + Rooms + Policies */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Left: description & policies */}
        <div className="flex flex-col gap-4">
          <Card padding="p-4">
            <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
              About this stay
            </h2>
            <p className="text-[0.8rem] text-slate-600 dark:text-slate-300">
              {hotel.description}
            </p>
            {hotel.hasPool && (
              <p className="mt-2 text-[0.8rem] text-slate-600 dark:text-slate-300">
                🏊 This property includes a swimming pool.
              </p>
            )}
          </Card>

          {hotel.policies?.length > 0 && (
            <Card padding="p-4">
              <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
                Policies
              </h2>
              <ul className="list-disc space-y-1 pl-4 text-[0.8rem] text-slate-600 dark:text-slate-300">
                {hotel.policies.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Right: room summary */}
        <div className="flex flex-col gap-4">
          <Card padding="p-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
              Room summary
            </h2>
            <ul className="space-y-1.5 text-[0.8rem] text-slate-700 dark:text-slate-200">
              <li>🛏 Single rooms: {hotel.singleRoom}</li>
              <li>🛏 Double rooms: {hotel.doubleRoom}</li>
              <li>🛏 Suites: {hotel.suite}</li>
              <li>👨‍👩‍👧 Family rooms: {hotel.familyRoom}</li>
            </ul>
          </Card>

          <Card padding="p-4">
            <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
              Booking
            </h2>
            <p className="text-[0.8rem] text-slate-600 dark:text-slate-300 mb-2">
              Pricing is dynamic and depends on dates and occupancy. Continue to
              booking to see live prices.
            </p>
            <button
              type="button"
              className="w-full rounded-2xl bg-emerald-500 py-2 text-[0.8rem] font-semibold text-white hover:bg-emerald-600"
            >
              Proceed to booking (mock)
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;
