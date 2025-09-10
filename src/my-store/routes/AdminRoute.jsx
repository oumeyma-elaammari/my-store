import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AdminRoute({ children }) {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (auth.user?.role !== "admin") {
    return (
      <div style={{ padding: 20 }}>
        <h2>Accès refusé</h2>
        <p>Tu n'es pas admin.</p>
      </div>
    );
  }

  return children;
}
