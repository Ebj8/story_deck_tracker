import { Button } from "@/components/ui/button";
import { useUser } from "@/auth/UserContext";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dbUser, signOutUser } = useUser();

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
          {dbUser?.is_admin && (
            <a href="/admin" className="hover:text-gray-400">
              Admin
            </a>
          )}
        </div>

        {/* Sign In/Sign Out Button */}
        <div className="flex w-[25%] justify-end">
          {user ? (
            <Button className="danger" onClick={signOutUser}>
              Sign Out
            </Button>
          ) : (
            <Button
              className="primary"
              onClick={() => navigate("/auth/login/")}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
