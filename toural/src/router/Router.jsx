import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AmbientBackground from "../components/layout/AmbientBackground";
import Navbar from "../components/layout/Navbar/Navbar";
import PageShell from "../components/layout/PageShell";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ResultsPage from "../pages/ResultsPage";
import MyTripsPage from "../pages/MyTripsPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <AmbientBackground />
    <Navbar />
    <PageShell>{children}</PageShell>
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
      path="/results"
      element={
        <MainLayout>
          <ResultsPage />
        </MainLayout>
      }
    />

    <Route
      path="/my-trips"
      element={
        <MainLayout>
          <ProtectedRoute>
            <MyTripsPage />
          </ProtectedRoute>
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
