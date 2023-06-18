import { AppDataSource } from "../config/db";
import { User } from "../modules/User/user.entity";

export const getUserRepository = () => {
  return AppDataSource.getRepository(User);
};
