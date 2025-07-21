import {
  createContext,
  type ReactNode,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Skeleton } from "./ui/skeleton";

interface IsUser {
  uid: string;
  email: string;
  name: string;
  role: string;
}

interface IsLoginParam extends IsUser {
  session_token: string;
}

export interface IsAuthContext {
  isAuthenticated: boolean;
  login: (IsLoginParam: IsLoginParam) => void;
  logout: () => void;
  user: IsUser | null;
  token: string | null;
}

export const AuthContext = createContext<IsAuthContext | null>(null);

const key = import.meta.env.VITE_LOCALSTORAGE_KEY;

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IsUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(key);
    console.log(`mounted: ${JSON.stringify(stored)}`);
    if (stored) {
      const { user, token } = JSON.parse(stored);
      console.log(`useEffect stored: ${JSON.stringify(user)} and ${token}`);
      setUser(user);
      setToken(token);
      setIsAuthenticated(!!token);
    }
    setLoading(false);
  }, []);

  const login = useCallback(({ session_token, ...user }: IsLoginParam) => {
    console.log(`Storing User Info: ${JSON.stringify(user)}`);
    setUser({
      uid: user.uid,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    setToken(session_token);
    setIsAuthenticated(true);
    localStorage.setItem(
      key,
      JSON.stringify({
        user: {
          uid: user.uid,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token: session_token,
      })
    );
  }, []);
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.setItem(key, "");
    console.log("Logout SuccessFull");
  }, []);

  if (loading)
    return (
      <>
        <Skeleton />
      </>
    );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
