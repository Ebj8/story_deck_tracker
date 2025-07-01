import { useState, useRef, useEffect } from "react";
import { useUser } from "@/auth/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const { user, dbUser, signOutUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="bg-gray-800 text-white shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Centered Logo */}
        <div className="flex-1 flex justify-center">
          <div
            className="text-xl font-bold cursor-pointer hover:text-gray-300 transition-colors"
            onClick={() => navigate("/collection")}
          >
            Story Deck Tracker
          </div>
        </div>
        {/* Right-aligned Hamburger */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-gray-800 hover:bg-gray-700"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
              <div className="py-2 flex flex-col">
                <button
                  className="text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    navigate("/collection");
                    setDropdownOpen(false);
                  }}
                >
                  Collection
                </button>
                <button
                  className="text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    navigate("/about");
                    setDropdownOpen(false);
                  }}
                >
                  About
                </button>
                {dbUser?.is_admin && (
                  <div>
                    <button
                      className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                      onClick={() => setAdminOpen((open) => !open)}
                    >
                      <span>Admin</span>
                      <ChevronDown
                        className={`ml-2 h-4 w-4 transition-transform ${
                          adminOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                    {adminOpen && (
                      <div className="ml-4 mt-1 flex flex-col gap-1">
                        <button
                          className="text-left py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                          onClick={() => {
                            navigate("/admin/sets");
                            setDropdownOpen(false);
                          }}
                        >
                          Sets
                        </button>
                        <button
                          className="text-left py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                          onClick={() => {
                            navigate("/admin/catalog");
                            setDropdownOpen(false);
                          }}
                        >
                          Catalog
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <div className="border-t border-gray-700 my-2" />
                {user ? (
                  <Button
                    variant="destructive"
                    className="w-full hover:bg-red-700"
                    onClick={() => {
                      signOutUser();
                      setDropdownOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      navigate("/auth/login/");
                      setDropdownOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
