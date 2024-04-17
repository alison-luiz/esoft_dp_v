import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TasksStatuses } from "../../../shared/utils/enums/tasks-statuses.enum";
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
  taskTypeId: number;

  @Column({ type: "enum", enum: TasksStatuses })
  status: TasksStatuses;

  @Column()
  creationDate: Date;

  @Column({ nullable: true })
  conclusionDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @ManyToOne(() => Category, (category) => category.tasks)
  category: Category;
}