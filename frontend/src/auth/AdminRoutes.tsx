import { useUser } from "@/auth/userContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const { dbUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dbUser) {
      setLoading(false);
    }
  }, [dbUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Redirect to the home page if the user is not an admin
  if (!dbUser?.is_admin) return <Navigate to="/" />;

  return <Outlet />;
};

export default AdminRoutes;
