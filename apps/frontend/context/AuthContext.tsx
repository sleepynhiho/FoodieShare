'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { isAuthenticated as checkAuth } from '@/services/authService';

interface AuthContextType {
  showAuthModal: (actionType?: string) => void;
  hideAuthModal: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount and when localStorage changes
  useEffect(() => {
    setIsAuthenticated(checkAuth());

    const handleStorageChange = () => {
      setIsAuthenticated(checkAuth());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
      }}
    >
      {children}
      <AuthModal
        isOpen={isModalOpen}
        onClose={hideAuthModal}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}