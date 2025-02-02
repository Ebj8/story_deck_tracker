import CollectionPage from "@/pages/collection/page";
import AboutPage from "@/pages/about/page";
import LoginPage from "@/pages/auth/page";
import { Routes, Route } from "react-router";
import { Layout } from "@/pages/layout";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CollectionPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
