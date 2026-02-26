import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  updateTask,
} from "../controllers/taskController.js";
import authUser from "../middleware/userMiddleware.js";

const taskRouter = express.Router();

taskRouter.post("/create", authUser, createTask);
taskRouter.put("/update/:id", authUser, updateTask);

taskRouter.get("/all", authUser, getAllTask);

taskRouter.delete("/delete/:id", authUser, deleteTask);

export default taskRouter;
