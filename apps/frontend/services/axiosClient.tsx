import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getToken, setTokenFromOutside } from "@/lib/tokenRegistry";
import { refreshToken } from "./authService";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let isRefreshing = false;
let waiters: Array<{ resolve: (v?: unknown) => void; reject: (e: any) => void }> = [];

const onRefreshed = () => { waiters.forEach(w => w.resolve()); waiters = []; };
const onRefreshError = (e: any) => { waiters.forEach(w => w.reject(e)); waiters = []; };

// Request: gắn token hiện tại
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
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean });

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
        const newAccess = await refreshToken(); // cookie gửi kèm
        // 1) Update header mặc định cho TẤT CẢ request sau
        axiosClient.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
        // 2) Đẩy vào Context qua registry để getToken() trả token mới
        setTokenFromOutside(newAccess);
        // 3) Đánh thức waiters
        onRefreshed();
      } catch (e) {
        onRefreshError(e); // reject toàn bộ waiters
        // Có thể clear Context/redirect login ở đây tuỳ app
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    } else {
      await new Promise((resolve, reject) => waiters.push({ resolve, reject }));
    }

    // Retry request với token mới
    original.headers = original.headers ?? {};
    const auth = axiosClient.defaults.headers.common.Authorization;
    if (auth) (original.headers as any).Authorization = auth;
    return axiosClient(original);
  }
);

export default axiosClient;
