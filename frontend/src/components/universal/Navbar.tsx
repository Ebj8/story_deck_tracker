import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">Your Logo</div>

        {/* Links */}
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
          <a href="/about" className="hover:text-gray-400">
            About
          </a>
          <a href="/services" className="hover:text-gray-400">
            Services
          </a>
          <a href="/contact" className="hover:text-gray-400">
            Contact
          </a>
        </div>

        {/* ShadCN Button */}
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
