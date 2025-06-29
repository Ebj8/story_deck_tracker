import { Outlet } from "react-router";

import Navbar from "@/components/universal/Navbar";
import Footer from "@/components/universal/Footer";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
