import React from "react";
import SectionHeader from "../ui/SectionHeader";
import FeaturedTripCard from "./FeaturedTripCard";
import { useNavigate } from "react-router-dom";
import { useTour } from "../../context/TourContext";

export default function FeaturedTripsSection() {
  const { tours } = useTour();
  const feature = tours.slice(0, 2);
  const navigate = useNavigate();
  return (
    <section className="flex w-full flex-col gap-4 lg:w-[75%] mx-auto items-center">
      <SectionHeader
        eyebrow="Explore ideas"
        title="Handpicked trips based on popular budgets"
        subtitle="Use these as inspiration for your own customised plan."
        action={
          <button
            type="button"
            onClick={() => navigate("/results")}
            className="text-[0.7rem] text-slate-500 transition-colors hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-300"
          >
            View all →
          </button>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
        {feature.map((trip) => (
          <FeaturedTripCard key={trip.id.timestamp} trip={trip} />
        ))}
      </div>
    </section>
  );
}
