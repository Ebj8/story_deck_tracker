import CollectionPage from "@/pages/collection/page";
import AboutPage from "@/pages/about/page";
import LoginPage from "@/pages/auth/page";
import SetPage from "@/pages/admin/set/page";
import CreateCatalogPage from "@/pages/admin/catalog/create/page";
import { Routes, Route } from "react-router";
import { Layout } from "@/pages/layout";
import AdminRoutes from "@/auth/AdminRoutes";
import { useUser } from "@/auth/userContext";
import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const { dbUser } = useUser();
  const [userReady, setUserReady] = useState(false);

  useEffect(() => {
    if (dbUser) {
      setUserReady(true);
    }
  }, [dbUser]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CollectionPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        {userReady && dbUser?.is_admin && (
          <Route path="admin" element={<AdminRoutes />}>
            <Route path="sets" element={<SetPage />} />
            <Route path="catalog" element={<CreateCatalogPage />} />
          </Route>
        )}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
