// --- Libraries
import { Navigate, Outlet } from "react-router";

// --- RTK
import { useAppSelector } from "@app/hooks";

// --- Main Component
const PublicRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PublicRoute;
