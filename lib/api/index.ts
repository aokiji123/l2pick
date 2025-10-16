import axios from "axios";

const headers: Record<string, string> = {
  Accept: "application/json",
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers,
  // withCredentials: true,
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage first, then sessionStorage
    const token =
      localStorage.getItem("auth-token") ||
      sessionStorage.getItem("auth-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized
      localStorage.removeItem("auth-token");
      sessionStorage.removeItem("auth-token");
      // You might want to redirect to login page here
      // window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
