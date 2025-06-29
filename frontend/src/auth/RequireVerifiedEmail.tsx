import { Navigate } from "react-router";
import { useUser } from "@/auth/UserContext";
import { ReactNode } from "react";

export default function RequireVerifiedEmail({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading } = useUser();

  if (loading) return null; // Or a spinner

  if (!user?.emailVerified && user) {
    return <Navigate to="/auth/verify-email" replace />;
  }

  return <>{children}</>;
}
