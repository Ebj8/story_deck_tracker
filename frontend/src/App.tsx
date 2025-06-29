import CollectionPage from "@/pages/collection/page";
import AboutPage from "@/pages/about/page";
import LoginPage from "@/pages/auth/login/page";
import SetPage from "@/pages/admin/set/page";
import CreateCatalogPage from "@/pages/admin/catalog/create/page";
import { Routes, Route } from "react-router";
import { Layout } from "@/pages/layout";
import AdminRoutes from "@/auth/AdminRoutes";
import { useUser } from "@/auth/UserContext";
import RequireVerifiedEmail from "@/auth/RequireVerifiedEmail";
import { useState, useEffect } from "react";
import "./index.css";
import SignupPage from "./pages/auth/signup/page";
import VerifyEmailPage from "./pages/auth/verify-email/page";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const { dbUser } = useUser();
  const [userReady, setUserReady] = useState(false);

  useEffect(() => {
    if (dbUser) {
      setUserReady(true);
    }
  }, [dbUser]);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireVerifiedEmail>
                <CollectionPage />
              </RequireVerifiedEmail>
            }
          />
          <Route
            path="/collection"
            element={
              <RequireVerifiedEmail>
                <CollectionPage />
              </RequireVerifiedEmail>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/signup" element={<SignupPage />} />
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
          {userReady && dbUser?.is_admin && (
            <Route path="admin" element={<AdminRoutes />}>
              <Route path="sets" element={<SetPage />} />
              <Route path="catalog" element={<CreateCatalogPage />} />
            </Route>
          )}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
