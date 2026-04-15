// --- Libraries
import { Navigate, Outlet } from "react-router";

// --- RTK
import { useAppSelector } from "@app/hooks";

// --- Types
type ProtectedRouteProps = {
  adminOnly?: boolean;
};

// --- Main Component
const ProtectedRoute = ({ adminOnly = false }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
