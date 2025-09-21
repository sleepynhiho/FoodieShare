// services/authService.ts
import axios from "axios";
import axiosClient from "./axiosClient";

// Create a separate axios instance for refresh token requests to avoid circular dependency
const refreshAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const res = await axiosClient.post("/auth/signup", {
      email,
      password,
      username: name,
    });
    if (!res.data?.user) throw new Error("Invalid response from server.");
    return { success: true, data: res.data };
  } catch (error: any) {
    console.error("Error signing up:", error);
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const message =
        error.response.data?.message || "Failed to sign up. Please try again.";
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("Network error: Unable to reach server");
    } else {
      // Something else happened
      throw new Error("An unexpected error occurred");
    }
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await axiosClient.post("/auth/login", { email, password });
    const token = res.data?.session?.access_token;
    if (!token) throw new Error("Invalid response from server.");
    return { success: true, data: res.data };
  } catch (error: any) {
    console.error("Error logging in:", error);
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || "Failed to login.";
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("Network error: Unable to reach server");
    } else {
      // Something else happened
      throw new Error("An unexpected error occurred");
    }
  }
};

export const logout = async () => {
  const res = await axiosClient.post("/auth/logout");
  if (!res.data) throw new Error("User not found or logout failed");
  return res.data;
};

export const refreshToken = async () => {
  try {
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

export const sendResetPasswordEmail = async (email: string) => {
  const res = await axiosClient.post("/auth/send-email-reset-password", {
    email,
  });
  if (!res.data?.userId) {
    throw new Error("Failed to send reset password email");
  }
  return { userId: res.data.userId };
};

export const resetPassword = async (userId: string, newPassword: string) => {
  const res = await axiosClient.post("/auth/reset-password", {
    userId,
    password: newPassword,
  });
  return res.data;
};
