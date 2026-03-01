import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", 
});

export const createTask = (data) => API.post("/task", data);
export const getAllTasks = () => API.get("/tasks");
export const updateTask = (id, data) =>
  API.put(`/update/task/${id}`, data);
export const deleteTask = (id) =>
  API.delete(`/task/${id}`);
