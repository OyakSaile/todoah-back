import { Request, Response } from "express";
import { Task } from "./tasks.entity";
import { httpStatus } from "../../utils/status";

export interface TaskModelInterface {
  getAllTasks: () => Promise<Task[]>;
  createTask: (task: Task) => Promise<Task>;
  updateTask: (task: Task) => {};
  deleteTask: (id: number) => {};
}

export class TaskController {
  model: TaskModelInterface;

  constructor(model: TaskModelInterface) {
    this.model = model;
  }

  getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await this.model.getAllTasks();
      res.json({ tasks });
    } catch (err) {
      console.error(err);
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send("Failed to retrieve tasks from the database");
    }
  };

  createTask = async (req: Request<any, any, Task>, res: any) => {
    const { description, id, image, isCompleted, title } = req.body;

    try {
      const task: Task = {
        description: description,
        id: id,
        image: image,
        isCompleted: isCompleted,
        title: title,
      };

      const data = await this.model.createTask(task);

      res.json({ data }).status(httpStatus.CREATED);
    } catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error creating task:");
      console.error(err);
    }
  };

  updateTask = async (req: Request<any, any, Task>, res: any) => {
    const { description, image, isCompleted, title } = req.body;
    const { id } = req.params;

    try {
      const task: Task = {
        description: description,
        id: id,
        image: image,
        isCompleted: isCompleted,
        title: title,
      };
      const data = this.model.updateTask(task);
      res.json({ data }).status(httpStatus.CREATED);
    } catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error creating task:");
      console.error(err);
    }
  };

  deleteTask = async (req: Request, res: any) => {
    const { id } = req.params;

    try {
      const data = await this.model.deleteTask(Number(id));
      res.json({ data }).status(httpStatus.CREATED);
    } catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error creating task:");
      console.error(err);
    }
  };
}
