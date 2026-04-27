import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/ui/SectionHeader";
import RatingStars from "../components/ui/RatingStars";
import axiosInstance from "../context/axiosInstance";

export default function HotelDetailPage() {
  const params = new URLSearchParams(location.search);
  const hotelId = params.get("hotelId");
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axiosInstance.get(`/hotels/${hotelId}`);
        if (res.status === 200) {
          setHotel(res.data);
          const recRes = await axiosInstance.post(`/api/recommend`, {
            hotelName: res.data.hotelName,
            cityName: res.data.cityName,
            topN: 5,
          });
          const recData = await recRes.data;
          setRecommended(recData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#777]">
        Loading...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#777]">
        Hotel not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] pb-24">
      <div className="mx-auto max-w-6xl px-4 pt-6 space-y-8">
        {/* HEADER */}
        <div className="space-y-3">
          <SectionHeader
            eyebrow="Stay details"
            title={hotel.hotelName}
            subtitle={`${hotel.cityName}, ${hotel.stateName}`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotel.images?.map((img, i) => (
              <img
                key={i}
                src="/hotel.jpg"
                className="w-full h-64 object-cover rounded-2xl"
              />
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            {/* SUMMARY */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#F4A261]/20 p-5">
                <p className="text-xs text-[#777]">Rating</p>
                <div className="flex items-center gap-2 mt-1">
                  <RatingStars rating={hotel.rating || 4} size="sm" />
                  <span className="font-semibold">{hotel.rating}/5</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#F4A261]/20 p-5 text-right">
                <p className="text-xs text-[#777]">Pool</p>
                <p className="text-sm font-medium mt-1">
                  {hotel.hasPool ? "Available" : "Not available"}
                </p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="rounded-2xl border border-[#F4A261]/20 p-5">
              <p className="text-xs text-[#777] mb-1">Location</p>
              <p className="text-sm">📍 {hotel.addressLine}</p>
            </div>

            {/* DESCRIPTION */}
            <div className="rounded-2xl border border-[#F4A261]/20 p-5">
              <p className="text-xs text-[#777] mb-2">About this place</p>
              <p className="text-sm text-[#555] leading-relaxed">
                {hotel.description}
              </p>
            </div>

            {/* ROOMS */}
            <div className="rounded-2xl border border-[#F4A261]/20 p-5">
              <p className="text-xs text-[#777] mb-3">Room availability</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Single", value: hotel.singleRoom },
                  { label: "Double", value: hotel.doubleRoom },
                  { label: "Suite", value: hotel.suite },
                  { label: "Family", value: hotel.familyRoom },
                ].map((room, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-[#F4A261]/10 p-3 text-center"
                  >
                    <p className="text-xs text-[#777]">{room.label}</p>
                    <p className="font-semibold">{room.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RECOMMENDED */}
            {recommended.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-[#C9622A] mb-3">
                  Nearby stays
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {recommended.map((rec) => (
                    <div
                      key={rec.hotelId}
                      onClick={() => navigate(`/hotel?hotelId=${rec.hotelId}`)}
                      className="cursor-pointer rounded-2xl border border-[#F4A261]/20 overflow-hidden hover:shadow-md"
                    >
                      <div className="h-36">
                        <img
                          src="/hotel.jpg"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-3 text-xs space-y-1">
                        <p className="font-semibold line-clamp-1">
                          {rec.hotelName}
                        </p>
                        <p className="text-[#777]">{rec.cityName}</p>

                        <div className="flex justify-between items-center">
                          <RatingStars rating={rec.rating || 4} size="xs" />
                          <span>{rec.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="hidden lg:block sticky top-20 h-fit">
            <div className="rounded-2xl border border-[#F4A261]/20 p-5 space-y-3">
              <p className="text-xs text-[#777]">Quick summary</p>

              <p className="text-sm">
                📍 {hotel.cityName}, {hotel.stateName}
              </p>
              <p className="text-sm">⭐ {hotel.rating}/5 rating</p>
              <p className="text-sm">
                Rooms:{" "}
                {(hotel.singleRoom || 0) +
                  (hotel.doubleRoom || 0) +
                  (hotel.suite || 0) +
                  (hotel.familyRoom || 0)}
              </p>

              <button className="w-full mt-2 px-4 py-2 rounded-xl bg-[#F4A261] text-white hover:bg-[#e8903e]">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FLOAT BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex justify-between items-center lg:hidden">
        <p className="text-sm font-semibold">
          Rooms:{" "}
          {(hotel.singleRoom || 0) +
            (hotel.doubleRoom || 0) +
            (hotel.suite || 0) +
            (hotel.familyRoom || 0)}
        </p>

        <button className="px-5 py-2 rounded-xl bg-[#F4A261] text-white">
          Book Now
        </button>
      </div>
    </div>
  );
}
