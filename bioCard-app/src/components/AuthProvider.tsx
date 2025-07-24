import { useQuery } from "@tanstack/react-query";
import { createContext, type ReactNode, useCallback, useState } from "react";

// const auth_token = import.meta.env.VITE_AUTH_TOKEN_COOKIE_KEY;
interface IsUser {
  uuid: string;
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
  updateUser: (IsUser: Partial<IsUser>) => void;
  user: IsUser | null;
  isLoading: boolean;
}

export const AuthContext = createContext<IsAuthContext | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IsUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { isLoading } = useQuery({
    queryKey: ["use_info"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/getProfile`,
          { credentials: "include" }
        );
        if (!res.ok) {
          setUser(null);
          setIsAuthenticated(false);
          return null;
        }
        const data = await res.json();
        setUser(data);
        setIsAuthenticated(true);
        return data;
      } catch (e) {
        setUser(null);
        setIsAuthenticated(false);
        return null;
      }
    },
  });

  const login = useCallback((user: IsUser) => {
    console.log(`Storing User Info: ${JSON.stringify(user)}`);
    setUser(user);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    setIsAuthenticated(false);
    console.log("Logout SuccessFull");
  }, []);

  const updateUser = useCallback(
    (newUser: Partial<IsUser>) => {
      if (!user) return;
      const updatedUser = { ...user, ...newUser } as IsUser;
      setUser(updatedUser);
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, updateUser, user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
