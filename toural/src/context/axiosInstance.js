import axios from "axios";
const API_BASE_URL = "http://localhost:8087";
const axiosInstance = axios.create({ baseURL: API_BASE_URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const errorMsg = error.response.data?.error;
      if (errorMsg === "JWT expired") {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("jwtToken");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
