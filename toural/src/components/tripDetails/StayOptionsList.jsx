import React from "react";
import Card from "../ui/Card";
import RatingStars from "../ui/RatingStars";
import { useNavigate } from "react-router-dom";

export const StayOptionsList = ({ stays }) => {
  const navigate = useNavigate();

  if (!stays || !Array.isArray(stays) || stays.length === 0) return null;

  const handleClick = (hotel) => {
    navigate(`/hotels/${hotel.hotelId}`);
  };

  return (
    <Card padding="p-5" className="w-full">
      <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
        Hotels included
      </h2>

      <div className="flex flex-col gap-3">
        {stays.map((hotel) => (
          <button
            key={hotel.hotelId}
            type="button"
            onClick={() => handleClick(hotel)}
            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/90 px-3 py-2 text-left text-[0.8rem] transition hover:border-emerald-400 hover:bg-emerald-50/70 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-emerald-400/70 dark:hover:bg-slate-900"
          >
            {/* Thumbnail */}
            {hotel.images?.length > 0 && (
              <img
                src={hotel.images[0]}
                alt={hotel.hotelName}
                className="h-14 w-14 rounded-xl object-cover"
              />
            )}

            {/* Hotel Info */}
            <div className="flex flex-col gap-1 flex-grow">
              <p className="font-medium text-slate-900 dark:text-slate-50 text-[0.85rem]">
                {hotel.hotelName}
              </p>

              <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                📍 {hotel.cityName}
              </p>

              <div className="flex items-center gap-2">
                <RatingStars rating={hotel.rating} size="xs" />
                {hotel.hasPool && (
                  <span className="text-[0.65rem] text-slate-500 dark:text-slate-400">
                    🏊 Pool
                  </span>
                )}
              </div>

              {/* policies preview */}
              {hotel.policies?.length > 0 && (
                <p className="text-[0.65rem] text-slate-500 dark:text-slate-400">
                  {hotel.policies.slice(0, 2).join(" · ")}
                </p>
              )}
            </div>

            {/* Pricing Placeholder */}
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Contact
              </p>
              <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                for pricing
              </p>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};
