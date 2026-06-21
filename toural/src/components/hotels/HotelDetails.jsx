import React from "react";
import Card from "../ui/Card";
import RatingStars from "../ui/RatingStars";
import { useNavigate } from "react-router-dom";

const HotelDetails = ({ hotel }) => {
  if (!hotel) return null;
  const navigate = useNavigate();

  const rating = hotel.rating || 4.0;

  return (
    <Card
      onClick={() => navigate(`/hotel?hotelId=${hotel.hotelId}`)}
      className="cursor-pointer w-full overflow-hidden"
    >
      <div className="flex flex-col">
        {/* IMAGE */}
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={"/hotel.jpg"}
            alt={hotel.hotelName}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-2 left-3 text-white">
            <h3 className="text-sm font-semibold leading-tight">
              {hotel.hotelName}
            </h3>
            <p className="text-[0.7rem] text-white/80">
              {hotel.cityName}, {hotel.stateName}
            </p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="p-3 space-y-2 text-[0.75rem] text-[#555]">
          <div className="flex items-center justify-between">
            <RatingStars rating={rating} size="xs" />
            <span className="text-[#777]">{hotel.rating}/5</span>
          </div>

          <p className="line-clamp-2 text-[#777]">📍 {hotel.addressLine}</p>

          <div className="flex justify-between items-center">
            <span className="text-[#777] text-[0.7rem]">
              Rooms: {(hotel.singleRoom || 0) + (hotel.doubleRoom || 0)}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/hotel?hotelId=${hotel.hotelId}`);
              }}
              className="rounded-lg bg-[#F4A261] px-2 py-1 text-[0.7rem] text-white hover:bg-[#e8903e]"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotelDetails;
