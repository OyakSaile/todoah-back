import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../User/user.entity";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  isCompleted!: boolean;

  @Column()
  description!: string;

  @Column()
  image!: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user!: User;
}
