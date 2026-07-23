import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/transactions",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const deleteTransaction = (id) =>
  API.delete(`/${id}`);
export const getTransactions = () => API.get("/");
export const updateTransaction = (id, data) =>
  API.put(`/${id}`, data);
export default API;