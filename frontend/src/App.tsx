import CollectionPage from "@/pages/collection/page";
import AboutPage from "@/pages/about/page";
import LoginPage from "@/pages/auth/page";
import { Routes, Route } from "react-router";
import { Layout } from "@/pages/layout";
import { UserProvider } from "@/auth/UserContext";
import "./index.css";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CollectionPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
