import { Outlet } from "react-router-dom";

import Navbar from "@/components/universal/Navbar";
import Footer from "@/components/universal/Footer";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <Navbar />
      <main className="flex-1 w-full h-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
