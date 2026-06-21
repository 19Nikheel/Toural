import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AmbientBackground from "../components/layout/AmbientBackground";
import UserProfilePage from "../components/user/UserProfilePage";
import Navbar from "../components/layout/Navbar/Navbar";
import PageShell from "../components/layout/PageShell";
import Footer from "../components/layout/Footer";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ResultsPage from "../pages/ResultsPage";
import MyTripsPage from "../pages/MyTripsPage";
import TripDetailsPage from "../pages/TripDetailsPage";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentStatusPage from "../pages/PaymentStatusPage";
import { ProtectedRoute } from "./ProtectedRoute";
import HotelDetailsPage from "../pages/HotelDetailsPage";
import AllPlacesPage from "../components/home/AllPlacesPage";
import HotelsListPage from "../components/hotels/HotelsListPage";
import PackagesPage from "../pages/PackagesPage";
import GuidesPage from "../pages/GuidesPage";
import CarsPage from "../pages/CarsPage";

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-white text-[#1a1a1a] flex flex-col">
    <AmbientBackground />
    <Navbar />
    <PageShell>{children}</PageShell>
    <Footer />
  </div>
);

const AppRouter = () => (
  <Routes>
    <Route
      path="/"
      element={
        <MainLayout>
          <HomePage />
        </MainLayout>
      }
    />
    <Route
      path="/destination"
      element={
        <MainLayout>
          <AllPlacesPage />
        </MainLayout>
      }
    />
    <Route
      path="/hotels"
      element={
        <MainLayout>
          <HotelsListPage />
        </MainLayout>
      }
    />
    <Route
      path="/guides"
      element={
        <MainLayout>
          <GuidesPage />
        </MainLayout>
      }
    />
    <Route
      path="/cars"
      element={
        <MainLayout>
          <CarsPage />
        </MainLayout>
      }
    />
    <Route
      path="/packages"
      element={
        <MainLayout>
          <PackagesPage />
        </MainLayout>
      }
    />
    <Route
      path="/hotel"
      element={
        <MainLayout>
          <HotelDetailsPage />
        </MainLayout>
      }
    />
    <Route
      path="/results"
      element={
        <MainLayout>
          <ResultsPage />
        </MainLayout>
      }
    />
    <Route
      path="/trip-details"
      element={
        <MainLayout>
          <TripDetailsPage />
        </MainLayout>
      }
    />
    <Route
      path="/profile"
      element={
        <MainLayout>
          <UserProfilePage />
        </MainLayout>
      }
    />
    <Route
      path="/trip/:id"
      element={
        <MainLayout>
          <TripDetailsPage />
        </MainLayout>
      }
    />
    <Route
      path="/my-trips"
      element={
        <ProtectedRoute>
          <MainLayout>
            <MyTripsPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/checkout"
      element={
        <ProtectedRoute>
          <MainLayout>
            <CheckoutPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/payment-status"
      element={
        <ProtectedRoute>
          <MainLayout>
            <PaymentStatusPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotels/:hotelId"
      element={
        <MainLayout>
          <HotelDetailsPage />
        </MainLayout>
      }
    />
    <Route
      path="/login"
      element={
        <MainLayout>
          <LoginPage />
        </MainLayout>
      }
    />
    <Route
      path="/signup"
      element={
        <MainLayout>
          <SignupPage />
        </MainLayout>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRouter;
