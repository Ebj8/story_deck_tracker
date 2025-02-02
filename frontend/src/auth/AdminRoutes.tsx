import { useUser } from "@/auth/userContext";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

const AdminRoutes = () => {
  const { dbUser } = useUser();
  // const { data } = useGetUser(user?.uid || "");
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (dbUser) {
      if (dbUser?.is_admin) {
        setAdmin(true);
      }
      setLoading(false);
    }
  }, [dbUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Redirect to the home page if the user is not an admin
  if (!admin) return <Navigate to="/" />;

  return <Outlet />;
};

export default AdminRoutes;
