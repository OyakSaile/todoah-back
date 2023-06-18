import express from "express";
import dotenv from "dotenv";
dotenv.config();

import "./config/db";
import TaskRouter from "./modules/Tasks/tasks.routes";
import UserRouter from "./modules/User/user.routes";

const app = express();

app.use(express.json());
app.use("/tasks", TaskRouter);
app.use("/users", UserRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${process.env.SERVER_PORT}`
  );
});
