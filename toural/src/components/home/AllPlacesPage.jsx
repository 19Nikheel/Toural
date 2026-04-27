import React, { useEffect, useState } from "react";
import FeaturedTripCard from "./FeaturedTripCard";
import { useTour } from "../../context/TourContext";

export default function AllPlacesPage() {
  const { tours } = useTour();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPlaces(tours);
    setLoading(false);
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-6">
      {loading ? (
        <div className="text-center text-[#777] mt-10">Loading places...</div>
      ) : (
        <>
          <p className="text-[0.75rem] text-[#777] mb-4">
            Showing {places.length} places
          </p>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {places.map((place) => (
              <FeaturedTripCard key={place.uniq_id} place={place} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
