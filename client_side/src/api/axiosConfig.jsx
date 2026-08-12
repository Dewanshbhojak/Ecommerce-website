import axios from "axios";

const rawUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const baseURL = rawUrl.endsWith("/api") ? rawUrl : `${rawUrl.replace(/\/+$/, "")}/api`;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Centralized Request Interceptor to attach Bearer token if available
api.interceptors.request.use(
  (config) => {
    const savedUser = localStorage.getItem("vibe_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        const token = parsed.Jwt || parsed.jwt || parsed.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        // Ignore parse error
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized Response Interceptor for 401 Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("vibe_user");
    }
    return Promise.reject(error);
  }
);

export default api;