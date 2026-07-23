import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-backend-production.up.railway.app",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getBudgets = () => API.get("/");

export const createBudget = (data) =>
  API.post("/", data);

export const updateBudget = (id, data) =>
  API.put(`/${id}`, data);

export const deleteBudget = (id) =>
  API.delete(`/${id}`);

export default API;