import { Navigate } from "react-router-dom";
import { useAuth } from "./components/context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Cargando desde el protect</h1>;
  }

  if (!user) {
    return <Navigate to="/registros/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
