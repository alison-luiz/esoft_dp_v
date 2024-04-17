import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TasksStatuses } from "../../../shared/utils/enums/tasks-statuses.enum";
import { TasksType } from "../../../shared/utils/enums/tasks-type.enum";
import { Category } from "../../categories/entities/category.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  creationDate: Date;

  @Column()
  conclusionDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "enum", enum: TasksType })
  task: TasksType;

  @Column({ type: "enum", enum: TasksStatuses })
  status: TasksStatuses;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @ManyToOne(() => Category, (category) => category.tasks)
  category: Category;
}