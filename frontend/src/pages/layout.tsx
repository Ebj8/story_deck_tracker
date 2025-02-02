import { Outlet } from "react-router";

import Navbar from "@/components/universal/Navbar";
import Footer from "@/components/universal/Footer";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <Navbar />
      <div className="flex-grow container max-w-8xl my-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
