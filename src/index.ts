import express from "express";
import dotenv from "dotenv";
dotenv.config();

import TaskRouter from "./modules/Tasks/tasks.routes";
import "./config/db";


const app = express();

app.use(express.json());
app.use("/tasks", TaskRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${process.env.SERVER_PORT}`
  );
});
