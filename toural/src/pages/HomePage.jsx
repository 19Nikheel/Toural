import React from "react";
import HeroSection from "../components/home/HeroSection";
import TripPlannerCard from "../components/home/TripPlannerCard";
import FeaturedTripsSection from "../components/home/FeaturedTripsSection";
import HomeInfoStrip from "../components/home/HomeInfoStrip";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="flex w-full flex-col">
        <HeroSection />
        <TripPlannerCard />
      </div>
      <div className="flex w-full flex-col gap-4 lg:w-[45%]">
        <FeaturedTripsSection />
        <HomeInfoStrip />
      </div>
    </div>
  );
}
