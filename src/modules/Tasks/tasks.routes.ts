import express from "express";
import { TaskController } from "./tasks.controller";
import TypeOrmModel from "./tasks.model";
const TaskRouter = express.Router();

const model = new TypeOrmModel();
const controller = new TaskController(model);

TaskRouter.get("/", controller.getAllTasks);
TaskRouter.post("/:userId", controller.createTask);
TaskRouter.put("/:id", controller.updateTask);
TaskRouter.delete("/:id", controller.deleteTask);

export default TaskRouter;
