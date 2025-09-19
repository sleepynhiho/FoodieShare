import axiosClient from "./axiosClient";

export const signUp = async (name: string, email: string, password: string) => {
  const response = await axiosClient.post("/auth/signup", {
    email,
    password,
    username: name,
  });

  return response;
};

export const login = async (email: string, password: string) => {
  const response = await axiosClient.post("/auth/login", {
    email,
    password,
  });

  // Store the token and user data
  localStorage.setItem("token", response.data.session.access_token);
  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response.data;
};

export const logout = async () => {
  try {
    const response = await axiosClient.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    if (!response.data) {
      throw new Error("User not found or logout failed");
    }

    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return response.data;
  } catch (error: any) {
    console.error("Logout error:", error);
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const refreshUserData = async () => {
  try {
    const response = await axiosClient.get("/auth/profile");
    // Update localStorage with fresh data
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    console.error("Error refreshing user data:", error);
    return getCurrentUser(); // fallback to localStorage data
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
