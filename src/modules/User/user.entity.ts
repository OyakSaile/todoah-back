import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Task } from "../Tasks/tasks.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone_number!: string;

  @Column()
  password!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}
