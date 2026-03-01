import { allTasks, create, deleteTask, updateTask } from "../controllers/controllers.js";
import express from "express";

const route=express.Router();

route.post("/task",create);
route.get("/tasks",allTasks);
route.put("/update/task/:id",updateTask)
route.delete("/task/:id",deleteTask);
export default route;
