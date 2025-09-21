// services/authService.ts
import axios from "axios";
import axiosClient from "./axiosClient";

// Create a separate axios instance for refresh token requests to avoid circular dependency
const refreshAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true // Important for handling HTTPOnly cookies
});

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

export const refreshToken = async () => {
  try {
    // Use the separate instance for refresh token requests
    const res = await refreshAxiosInstance.post("/auth/refresh");
    if (!res.data?.accessToken) {
      throw new Error("No access token received");
    }
    return res.data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

export const refreshUserData = async () => {
  const res = await axiosClient.get("/auth/profile");
  return res.data;
};
