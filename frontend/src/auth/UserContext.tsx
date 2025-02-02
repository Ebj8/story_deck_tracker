import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";

interface UserContextType {
  user: User | null;
  signOutUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  signOutUser: async () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null); // Clear user state
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, signOutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
