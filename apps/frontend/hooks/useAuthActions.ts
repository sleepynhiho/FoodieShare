// hooks/useAuthActions.ts
"use client";

import { useCallback } from "react";
import {
  login as svcLogin,
  logout as svcLogout,
  refreshUserData as svcRefresh,
} from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

export function useAuthActions() {
  const { setToken, setUser, setIsAuthenticated } = useAuth();

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await svcLogin(email, password);
      const token = res.data.session.access_token;
      const user = res.data.user;

      setToken(token);
      setUser(user ?? null);
      setIsAuthenticated(true);
      return res;
    },
    [setToken, setUser, setIsAuthenticated]
  );

  const logout = useCallback(async () => {
    await svcLogout();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, [setToken, setUser, setIsAuthenticated]);

  const refreshUserData = useCallback(async () => {
    const data = await svcRefresh();
    setUser(data ?? null);
    return data;
  }, [setUser]);

  return { login, logout, refreshUserData };
}
