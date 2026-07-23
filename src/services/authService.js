import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-backend-production.up.railway.app",
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const changePassword = (data) =>
  API.put("/change-password", data);

export default API;