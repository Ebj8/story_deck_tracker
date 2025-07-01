import { Outlet } from "react-router-dom";

import Navbar from "@/components/universal/Navbar";
import Footer from "@/components/universal/Footer";
import MobileNavbar from "@/components/universal/MobileNavbar";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <div className="hidden sm:block">
        <Navbar />
      </div>
      <div className="sm:hidden">
        <MobileNavbar />
      </div>
      <main className="flex-1 w-full h-full sm:pt-0 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
