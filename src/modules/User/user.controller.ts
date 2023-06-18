import { Request, Response } from "express";
import { User } from "./user.entity";
import { UserModel } from "./user.model";
import { httpStatus } from "../../utils/status";
import bcrypt from "bcrypt";
import { userSchema } from "../../validations/userSchema";
import { IUpdateUser } from "./user.interfaces";

export class UserController {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.model.getAllUsers();
      res.json({ users });
    } catch (err) {
      console.error(err);
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send("Failed to retrieve users from the database");
    }
  };

  createUser = async (
    req: Request<any, any, User>,
    res: Response
  ): Promise<void> => {
    try {
      const { email, name, password, phone_number } = req.body;

      const { error } = await userSchema.validateAsync({
        email,
        phone_number,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      const cryptedPassword = await bcrypt.hash(password, 13);

      const user = {
        email,
        name,
        phone_number,
        password: cryptedPassword,
      };

      const data = await this.model.createUser(user);
      res.status(httpStatus.CREATED).json({ data });
    } catch (err: any) {
      const statusCode = err.statusCode || httpStatus.BAD_REQUEST;
      res.status(statusCode).json({ error: err.message });
    }
  };

  updateUser = async (req: Request<any, any, IUpdateUser>, res: Response) => {
    const { email, password, phone_number, name } = req.body;
    const { id } = req.params;

    await userSchema.validateAsync({
      email,
      phone_number,
      password,
      name,
    });

    const cryptedPassword = await bcrypt.hash(password, 13);

    const user = {
      email,
      name,
      phone_number,
      password: cryptedPassword,
      userId: id,
    };

    const data = await this.model.updateUser(user);
    res.status(httpStatus.CREATED).json({ data });
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const data = await this.model.deleteUser(Number(id));
      res.json({ data }).status(httpStatus.OK);
    } catch (err: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
      console.error(err);
    }
  };
}
