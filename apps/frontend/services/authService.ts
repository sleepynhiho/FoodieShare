// services/authService.ts
import axiosClient from "./axiosClient";

export const signUp = async (name: string, email: string, password: string) => {
  const res = await axiosClient.post("/auth/signup", {
    email,
    password,
    username: name,
  });
  if (!res.data?.user) throw new Error("Invalid response from server.");
  return { success: true, data: res.data };
};

export const login = async (email: string, password: string) => {
  const res = await axiosClient.post("/auth/login", { email, password });
  const token = res.data?.session?.access_token;
  if (!token) throw new Error("Invalid response from server.");
  return { success: true, data: res.data };
};

export const logout = async () => {
  const res = await axiosClient.post("/auth/logout");
  if (!res.data) throw new Error("User not found or logout failed");
  return res.data;
};

export const refreshUserData = async () => {
  const res = await axiosClient.get("/auth/profile");
  return res.data;
};
