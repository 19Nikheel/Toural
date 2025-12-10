import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { userAuthenticated, initializing } = useAuth();
  const location = useLocation();

  // While we’re checking localStorage, avoid flashing
  if (initializing) return null;

  if (false) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
