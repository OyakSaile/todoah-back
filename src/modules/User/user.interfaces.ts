import { User } from "./user.entity";

export interface IUpdateUser {
  email: string;
  name: string;
  phone_number: string;
  password: string;
  userId: number;
}

export interface IUserController {
  getAllUsers: () => Promise<User[]>;
  createUser: (data: {
    email: string;
    name: string;
    password: string;
    phone_number: string;
  }) => {};
  updateUser: (data: {
    email: string;
    name: string;
    password: string;
    phone_number: string;
    userId: number;
  }) => {};
  deleteUser: (id: number) => {};
}
