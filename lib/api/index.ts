import axios from "axios";

function getLanguageFromStorage(): string {
  if (typeof window === "undefined") {
    return "ru";
  }

  try {
    const stored = localStorage.getItem("language-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      const language = parsed?.state?.currentLanguage || "RU";
      return language.toLowerCase();
    }
  } catch (error) {
    console.error("Error reading language from storage:", error);
  }

  return "ru";
}

const headers: Record<string, string> = {
  Accept: "application/json",
  "Accept-Language": getLanguageFromStorage(),
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("auth-token") ||
      sessionStorage.getItem("auth-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const language = getLanguageFromStorage();
    config.headers["Accept-Language"] = language;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth-token");
      sessionStorage.removeItem("auth-token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
