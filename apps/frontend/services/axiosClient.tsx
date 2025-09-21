import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getToken, setTokenFromOutside } from "@/lib/tokenRegistry";
import { refreshToken } from "./authService";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let isRefreshing = false;
let waiters: Array<{
  resolve: (v?: unknown) => void;
  reject: (e: any) => void;
}> = [];

const onRefreshed = () => {
  waiters.forEach((w) => w.resolve());
  waiters = [];
};
const onRefreshError = (e: any) => {
  waiters.forEach((w) => w.reject(e));
  waiters = [];
};

// Request: attach current token
axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: refresh-on-401
axiosClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const url = original?.url || "";
    const isAuthRoute =
      url.includes("/auth/refresh") ||
      url.includes("/auth/login") ||
      url.includes("/auth/logout");

    if (error.response?.status !== 401 || isAuthRoute || original?._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newAccess = await refreshToken();
        // Update default header for all subsequent requests
        axiosClient.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
        // Push new token into Context via registry
        setTokenFromOutside(newAccess);
        // Wake up the waiters
        onRefreshed();
      } catch (e) {
        onRefreshError(e);
        // Clear the login session
        delete axiosClient.defaults.headers.common.Authorization;
        setTokenFromOutside(null);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth:logout-required"));
        }

        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    } else {
      await new Promise((resolve, reject) => waiters.push({ resolve, reject }));
    }

    // Retry request with new token
    original.headers = original.headers ?? {};
    const auth = axiosClient.defaults.headers.common.Authorization;
    if (auth) (original.headers as any).Authorization = auth;
    return axiosClient(original);
  }
);

export default axiosClient;
