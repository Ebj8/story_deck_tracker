import CollectionPage from "@/pages/collection/page";
import AboutPage from "@/pages/about/page";
import LoginPage from "@/pages/auth/page";
import { Routes, Route } from "react-router";
import { Layout } from "@/pages/layout";
import { UserProvider } from "@/auth/userContext";
import AdminRoutes from "@/auth/AdminRoutes";
import { useUser } from "@/auth/userContext";
import "./index.css";

function App() {
  const { user } = useUser();
  return (
    <UserProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CollectionPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          {user && (
            <Route element={<AdminRoutes />}>
              <Route path="/admin" element={<h1>Admin Page</h1>} />
            </Route>
          )}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
