import React, { useEffect, useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import FeaturedTripCard from "./FeaturedTripCard";
import { useNavigate } from "react-router-dom";

export default function FeaturedPlacesSection() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8084/tours/top")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="flex w-full flex-col gap-5 lg:w-[75%] mx-auto items-center">
      <SectionHeader
        eyebrow="Explore places"
        title="Top rated places you shouldn’t miss"
        subtitle="Based on reviews, popularity, and experience score."
        action={
          <button
            type="button"
            onClick={() => navigate("/all-places")}
            className="text-[0.75rem] text-[#777] transition-colors duration-150 hover:text-[#C9622A]"
          >
            View all →
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1">
        {places.map((place) => (
          <FeaturedTripCard key={place.uniq_id} place={place} />
        ))}
      </div>
    </section>
  );
}
