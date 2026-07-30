import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../../../types/roles";

interface ProtectedRouteProps {
  roles?: UserRole[];
}

export default function ProtectedRoute({
  roles,
}: ProtectedRouteProps) {
  const {
    user,
    profile,
    loading,
  } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (!profile) {
    return (
      <Navigate
        to="/complete-profile"
        replace
      />
    );
  }

  if (
    roles &&
    !roles.includes(profile.role)
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}