import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config;
});

apiClient.interceptors.response.use((response) => response,
  (error) => {
    if (error.response.status === 401 && window.location.pathname !== "/auth/login") {
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/login";
    }
  });