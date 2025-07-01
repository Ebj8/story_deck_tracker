import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useUser } from "@/auth/UserContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dbUser, signOutUser } = useUser();

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex w-[25%]">
          <div
            className="text-xl font-bold cursor-pointer hover:text-gray-300 transition-colors"
            onClick={() => navigate("/collection")}
          >
            Story Deck Tracker
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:text-gray-300 hover:bg-gray-700 bg-gray-800"
                  )}
                  onClick={() => navigate("/collection")}
                >
                  Collection
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:text-gray-300 hover:bg-gray-700 bg-gray-800"
                  )}
                  onClick={() => navigate("/about")}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>

              {dbUser?.is_admin && (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:text-gray-300 hover:bg-gray-700 bg-gray-800">
                      Admin
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4 md:w-[250px] md:grid-cols-1 lg:w-[300px] bg-gray-700 rounded-lg">
                        <li>
                          <NavigationMenuLink
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white"
                            onClick={() => navigate("/admin/sets")}
                          >
                            <div className="text-sm font-medium leading-none text-white">
                              Sets
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                              Manage card sets and collections
                            </p>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white"
                            onClick={() => navigate("/admin/catalog")}
                          >
                            <div className="text-sm font-medium leading-none text-white">
                              Catalog
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                              Manage card catalog and inventory
                            </p>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Sign In/Sign Out Button */}
        <div className="flex w-[25%] justify-end">
          {user ? (
            <Button
              variant="destructive"
              onClick={signOutUser}
              className="hover:bg-red-700"
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={() => navigate("/auth/login/")}
              className="bg-blue-600 hover:bg-blue-700"
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
