import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});



api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("SESSION_AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
