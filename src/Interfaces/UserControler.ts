import { User } from "../modules/User/user.entity";

export interface IUserController {
  getAllUsers: () => Promise<User[]>;
  createUser: (task: User) => Promise<User>;
  updateUser: (task: User) => {};
  deleteUser: (id: number) => {};
}
