import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axiosInstance from "./axiosInstance";

const TourContext = createContext(null);

export const TourProvider = ({ children }) => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchToursByCityCode = useCallback(async (cityCode) => {
    if (!cityCode) return;

    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get(`/tours/city-code/${cityCode}`);
      const data = res.data;
      setTours(data);
      return data;
    } catch (err) {
      console.error("Error fetching tours by city code:", err);
      const msg =
        err.response?.data?.message || err.message || "Failed to search tours";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTours = useCallback(async () => {
    try {
      setInitialLoading(true);
      setError(null);

      const res = await axiosInstance.get("/tours");
      const data = res.data;
      setTours(data);
    } catch (err) {
      console.error("Error fetching tours:", err);
      const msg =
        err.response?.data?.message || err.message || "Failed to load tours";
      setError(msg);
    } finally {
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const fetchTourById = useCallback(async (id) => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get(`/tours/${id}`);
      const data = res.data;

      setSelectedTour(data);
      return data;
    } catch (err) {
      console.error("Error fetching tour:", err);
      const msg =
        err.response?.data?.message || err.message || "Failed to load tour";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTour = useCallback(async (tourPayload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.post("/tours", tourPayload);
      const created = res.data;

      setTours((prev) => [...prev, created]);
      return created;
    } catch (err) {
      console.error("Error creating tour:", err);
      const msg =
        err.response?.data?.message || err.message || "Failed to create tour";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTour = useCallback(async (id, tourPayload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.put(`/tours/${id}`, tourPayload);
      const updated = res.data;

      setTours((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

      setSelectedTour((prev) =>
        prev && prev.id === updated.id ? updated : prev
      );

      return updated;
    } catch (err) {
      console.error("Error updating tour:", err);
      const msg =
        err.response?.data?.message || err.message || "Failed to update tour";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTour = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);

      await axiosInstance.delete(`/tours/${id}`);

      setTours((prev) => prev.filter((t) => t.id !== id));

      setSelectedTour((prev) => (prev && prev.id === id ? null : prev));
    } catch (err) {
      console.error("Error deleting tour:", err);
      const msg =
        err.response?.data?.message || err.message || "Failed to delete tour";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    tours,
    selectedTour,
    loading,
    initialLoading,
    error,
    fetchTours,
    fetchTourById,
    createTour,
    updateTour,
    deleteTour,
    setSelectedTour,
    setError,
    fetchToursByCityCode,
  };

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};

export const useTour = () => {
  const ctx = useContext(TourContext);
  if (!ctx) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return ctx;
};
