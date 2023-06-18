import { Task } from "./tasks.entity";
import { AppDataSource } from "../../config/db";
import { TaskModelInterface } from "./tasks.controller";
import { User } from "../User/user.entity";
import { ITasks } from "../../Interfaces/Tasks";

export default class TypeOrmModel implements TaskModelInterface {
  getAllTasks = async () => {
    const results = AppDataSource.getRepository(Task).find({
      relations: { user: true },
    });
    return results;
  };

  createTask = async (data: {
    description: string;
    image: string;
    isCompleted: boolean;
    title: string;
    userId: number;
  }) => {
    const userRepository = await AppDataSource.getRepository(User);
    const taskRepository = await AppDataSource.getRepository(Task);

    const findUser = await userRepository.findOneBy({
      id: data.userId,
    });

    if (!findUser) {
      return "User not found";
    }

    const newTask = new Task();
    newTask.description = data.description;
    newTask.title = data.title;
    newTask.isCompleted = data.isCompleted;
    newTask.image = data.image;
    newTask.user = findUser;

    await taskRepository.save(newTask);

    return { message: "sucess" };
  };

  updateTask = async ({
    id,
    description,
    image,
    isCompleted,
    title,
  }: ITasks) => {
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
