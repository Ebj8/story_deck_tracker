import { Button } from "@/components/ui/button";
import { useUser } from "@/auth/UserContext";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          <Button variant="ghost" onClick={() => navigate("/collection")}>
            Collection
          </Button>
          <Button variant="ghost" onClick={() => navigate("/about")}>
            About
          </Button>
          {dbUser?.is_admin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Admin</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => navigate("/admin/sets")}
                >
                  Sets
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => navigate("/admin/catalog")}
                >
                  Catalog
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
