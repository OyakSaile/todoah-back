import { User } from "../modules/User/user.entity";

export interface ITasks {
  user?: User;
  id: number;
  title: string;
  isCompleted: boolean;
  description: string;
  image: string;
}
