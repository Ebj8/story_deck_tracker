import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useGetUser } from "@/requests/gen/react-query/user";
import { UserRead } from "@/requests/gen/react-query/fastAPI.schemas";

interface UserContextType {
  user: User | null;
  dbUser: UserRead | null;
  loading: boolean;
  signOutUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  dbUser: null,
  loading: true,
  signOutUser: async () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  // React Query hook to fetch user data
  const {
    data: dbUser,
    isLoading,
    refetch,
  } = useGetUser(user?.uid || "", {
    query: {
      enabled: !!user, // Only fetch when user exists
    },
  });

  useEffect(() => {
    if (user) refetch();
  }, [user, refetch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload(); // force latest info from Firebase
        setUser(auth.currentUser); // update with the reloaded user
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, dbUser: dbUser || null, loading: isLoading, signOutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
