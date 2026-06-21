import { createContext, useContext, useState } from "react";
import axiosInstance from "../context/axiosInstance";

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [errorHotels, setErrorHotels] = useState(null);

  const fetchHotelsByCityCode = async (cityCode) => {
    if (!cityCode) return;

    try {
      setLoadingHotels(true);
      setErrorHotels(null);

      const res = await axiosInstance.get(`/hotels/city-code/${cityCode}`);

      setHotels(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setErrorHotels("Failed to load hotels");
      setHotels([]);
    } finally {
      setLoadingHotels(false);
    }
  };

  return (
    <HotelContext.Provider
      value={{
        hotels,
        loadingHotels,
        errorHotels,
        fetchHotelsByCityCode,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => useContext(HotelContext);
