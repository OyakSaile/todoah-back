import express from "express";
import { UserController } from "./user.controller";

const UserRouter = express.Router();
const controller = new UserController();

UserRouter.get("/", controller.getAllUsers);
UserRouter.post("/", controller.createUser);
UserRouter.put("/:id", controller.updateUser);
UserRouter.delete("/:id", controller.deleteUser);

export default UserRouter;
