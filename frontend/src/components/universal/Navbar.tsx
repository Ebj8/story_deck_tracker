import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex w-[25%]">
          <div className="text-xl font-bold">Story Deck Tracker</div>
        </div>

        {/* Links */}
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-400">
            Collection
          </a>
          <a href="/about" className="hover:text-gray-400">
            About
          </a>
        </div>

        {/* ShadCN Button */}
        <div className="flex w-[25%] justify-end">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <a href="/login">Sign In</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
