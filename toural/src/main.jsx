import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./theme/ThemeContext";
import AuthProvider from "./context/AuthContext";
import UserProvider from "./context/UserContext";
import { TourProvider } from "./context/TourContext";
import { HotelProvider } from "./pages/HotelContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TourProvider>
      <HotelProvider>
        <AuthProvider>
          <UserProvider>
            <BrowserRouter>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </BrowserRouter>
          </UserProvider>
        </AuthProvider>
      </HotelProvider>
    </TourProvider>
  </React.StrictMode>
);
