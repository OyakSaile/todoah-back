import { Task } from "./tasks.entity";
import { AppDataSource } from "../../config/db";
import { TaskModelInterface } from "./tasks.controller";

export default class TypeOrmModel implements TaskModelInterface {
  getAllTasks = async () => {
    const results = AppDataSource.getRepository(Task).find();
    return results;
  };

  createTask = async ({ description, image, isCompleted, title }: Task) => {
    const newTask = new Task();
    newTask.description = description;
    newTask.title = title;
    newTask.isCompleted = isCompleted;
    newTask.image = image;

    const taskCreated = await AppDataSource.manager.save(newTask);

    return taskCreated;
  };

  updateTask = async ({ id, description, image, isCompleted, title }: Task) => {
    const taskRepository = await AppDataSource.getRepository(Task);
    const taskToUpdate = await taskRepository.findOneBy({
      id,
    });

    if (taskToUpdate) {
      taskToUpdate.description = description;
      taskToUpdate.image = image;
      taskToUpdate.isCompleted = isCompleted;
      taskToUpdate.title = title;
      const taskCreated = await AppDataSource.manager.save(taskToUpdate);

      return taskCreated;
    }

    if (!taskToUpdate) {
      return "Task does not exist";
    }
  };

  deleteTask = async (id: number) => {
    const taskRepository = AppDataSource.getRepository(Task);
    const taskToDelete = await taskRepository.findOneBy({
      id,
    });

    if (taskToDelete) {
      await taskRepository.remove(taskToDelete);
      return `Task Deleted with the ${id}`;
    }

    if (!taskToDelete) {
      return "Task does not exist";
    }
  };
}
