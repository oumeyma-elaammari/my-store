import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AdminOrSubadminRoute({ children }) {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const role = auth.user?.role;
  if (role !== "admin" && role !== "subadmin") {
    return (
      <div style={{ padding: 20 }}>
        <h2>Accès refusé</h2>
        <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
      </div>
    );
  }

  return children;
}
