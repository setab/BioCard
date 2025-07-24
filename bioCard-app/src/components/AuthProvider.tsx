import { createContext, type ReactNode, useCallback, useState } from "react";
import { useCookies } from "react-cookie";

const auth_token = import.meta.env.VITE_AUTH_TOKEN_COOKIE_KEY;
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
  updateUser: (IsUser: Partial<IsUser>) => void;
  user: IsUser | null;
  // token: string | null;
}

export const AuthContext = createContext<IsAuthContext | null>(null);

const key = import.meta.env.VITE_LOCALSTORAGE_KEY;

function getStoredUser() {
  const item = localStorage.getItem(key);
  if (item !== null) {
    return JSON.parse(item) as IsUser;
  } else {
    return null;
  }
}

function setStoreUser(user: IsUser | null) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [authCookie, setAuthCookie, removeCookie] = useCookies([auth_token]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!authCookie.session_token
  );
  const [user, setUser] = useState<IsUser | null>(getStoredUser());

  const login = useCallback(({ session_token, ...user }: IsLoginParam) => {
    console.log(`Storing User Info: ${JSON.stringify(user)}`);
    setAuthCookie(auth_token, session_token);
    setStoreUser({ ...user });
    setUser({ ...user });
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    removeCookie(auth_token);
    setStoreUser(null);
    setUser(null);
    setIsAuthenticated(false);
    console.log("Logout SuccessFull");
  }, []);

  const updateUser = useCallback((newUser: Partial<IsUser>) => {
    const updatedUser = { ...user, ...newUser } as IsUser;
    setStoreUser(updatedUser);
    setUser(updatedUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, updateUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
