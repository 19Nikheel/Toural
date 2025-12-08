import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { userAuthenticated } = useAuth();
  return userAuthenticated ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;
