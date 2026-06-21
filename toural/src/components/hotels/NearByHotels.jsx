import React, { useEffect, useState } from "react";
import Card from "../ui/Card";
import HotelDetails from "../hotels/HotelDetails";

export default function NearbyHotels({ city }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    const fetchHotels = async () => {
      try {
        const res = await fetch(
          `http://localhost:8084/hotels/hotel-by-city/${city}`,
        );
        const data = await res.json();
        setHotels(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [city]);

  return (
    <Card padding="p-5" className="w-full">
      <h2 className="text-sm font-semibold text-[#C9622A] mb-3">
        Nearby Hotels
      </h2>

      {loading ? (
        <p className="text-[0.75rem] text-[#777]">Loading hotels...</p>
      ) : hotels.length === 0 ? (
        <p className="text-[0.75rem] text-[#777]">No hotels found</p>
      ) : (
        <div className="flex flex-col gap-3">
          {hotels.slice(0, 3).map((hotel) => (
            <HotelDetails key={hotel.hotelId} hotel={hotel} />
          ))}
        </div>
      )}
    </Card>
  );
}
