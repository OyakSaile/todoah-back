import { User } from "./user.entity";
import { AppDataSource } from "../../config/db";
import { IUserController } from "./user.interfaces";
import { getUserRepository } from "../../repositories/userRepository";
import { httpStatus } from "../../utils/status";
import { IUpdateUser } from "./user.interfaces";
import { createError } from "../../utils/createError";

export class UserModel implements IUserController {
  getAllUsers = async (): Promise<User[]> => {
    const userRepository = await getUserRepository();
    const users = await userRepository.find();
    return users;
  };

  createUser = async (data: {
    email: string;
    name: string;
    password: string;
    phone_number: string;
  }): Promise<User> => {
    const userRepository = await getUserRepository();
    const verifyEmailExists = await userRepository.findOneBy({
      email: data.email,
    });

    if (verifyEmailExists) {
      createError("Email already exists", httpStatus.CONFLICT);
    }

    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.phone_number = data.phone_number;
    user.password = data.password;

    const userCreated = await AppDataSource.manager.save(user);
    return userCreated;
  };

  updateUser = async (data: IUpdateUser) => {
    const userRepository = await getUserRepository();
    const userToUpdate = await userRepository.findOneBy({ id: data.userId });

    if (!userToUpdate) {
      createError("User not found", httpStatus.NOT_FOUND);
    }

    if (userToUpdate) {
      userToUpdate.email = data.email;
      userToUpdate.name = data.name;
      userToUpdate.password = data.password;
      userToUpdate.phone_number = data.phone_number;

      const userUpdated = await AppDataSource.manager.save(userToUpdate);
      return userUpdated;
    }
  };

  deleteUser = async (id: number): Promise<string> => {
    const userRepository = await getUserRepository();
    const userToDelete = await userRepository.findOneBy({ id });

    if (!userToDelete) {
      createError("User not found", httpStatus.NOT_FOUND);
    }

    // Remova o usuário apenas se o objeto userToDelete não for nulo
    if (userToDelete) {
      await userRepository.remove(userToDelete);
    }

    return `User deleted with ID ${id}`;
  };
}
