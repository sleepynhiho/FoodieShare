import axiosClient from "./axiosClient";

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const response = await axiosClient.post("/auth/signup", {
      email,
      password,
      username: name,
    });
    if (!response.data?.user) {
      throw new Error("Invalid response from server. Please try again.");
    }
    return {
      success: true,
      data: response.data,
    };
  } catch (err: any) {
    console.error('Error signing up:', err);
    // Handle different error types
    if (err.response) {
      // Server responded with error status
      const message =
        err.response.data?.message || "Failed to sign up. Please try again.";
      throw new Error(message);
    } else if (err.request) {
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
    const response = await axiosClient.post("/auth/login", {
      email,
      password,
    });

    if (!response.data?.session?.access_token) {
      throw new Error("Invalid response from server. Please try again.");
    }

    // Store the token and user data
    localStorage.setItem("token", response.data.session.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return {
      success: true,
      data: response.data,
    };
  } catch (err: any) {
    console.error('Error logging in:', err);
    // Handle different error types
    if (err.response) {
      // Server responded with error status
      const message = err.response.data?.message || "Failed to login.";
      throw new Error(message);
    } else if (err.request) {
      // Request was made but no response received
      throw new Error("Network error: Unable to reach server");
    } else {
      // Something else happened
      throw new Error("An unexpected error occurred");
    }
  }
};

export const logout = async () => {
  try {
    const response = await axiosClient.post(
      "/auth/logout"
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
