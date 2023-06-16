import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
}
