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
  isAuthLoading: boolean; // Thêm thuộc tính isAuthLoading
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    registerTokenGetter(() => token);
  }, [token]);

  // Lưu user vào localStorage khi user thay đổi
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Lưu token vào localStorage khi token thay đổi
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Khi app khởi động, lấy lại user/token từ localStorage nếu có
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    console.log("Restoring from localStorage:", { storedUser, storedToken });
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setIsAuthLoading(false);
  }, []);

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
        isAuthLoading, // Thêm vào context
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
