"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { registerTokenGetter } from "@/lib/tokenRegistry";

interface User {
  id: string;
  email: string;
  [key: string]: any;
}

interface AuthContextType {
  showAuthModal: (actionType?: string) => void;
  hideAuthModal: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    registerTokenGetter(() => token);
  }, [token]);

  const showAuthModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const hideAuthModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        showAuthModal,
        hideAuthModal,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        token,
        setToken,
        isAuthLoading,
      }}
    >
      {children}
      <AuthModal isOpen={isModalOpen} onClose={hideAuthModal} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
