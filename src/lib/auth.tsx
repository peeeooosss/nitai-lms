import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { api, setToken, getStoredToken } from "./api.ts";

interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  onboarded: boolean;
  isAdmin: boolean;
  totalXp: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  signout: () => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(getStoredToken());
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const u = await api.get<User>("/api/auth/me");
      setUser(u);
    } catch {
      setToken(null);
      setTokenState(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      fetchUser().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      setUser(null);
    }
  }, [token, fetchUser]);

  const signin = useCallback(async (email: string, password: string) => {
    const data = await api.post<{ token: string; user: User }>("/api/auth/signin", { email, password });
    setToken(data.token);
    setTokenState(data.token);
    setUser(data.user);
  }, []);

  const signup = useCallback(async (email: string, password: string, name?: string) => {
    const data = await api.post<{ token: string; user: User }>("/api/auth/signup", { email, password, name });
    setToken(data.token);
    setTokenState(data.token);
    setUser(data.user);
  }, []);

  const signout = useCallback(() => {
    setToken(null);
    setTokenState(null);
    setUser(null);
  }, []);

  const refetchUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signin, signup, signout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
