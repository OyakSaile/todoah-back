import { Task } from "../modules/Tasks/tasks.entity";
import { User } from "../modules/User/user.entity";

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  password: string;

  tasks?: Task[];
}
