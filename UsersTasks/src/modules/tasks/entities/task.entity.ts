import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TasksStatuses } from "../../../shared/utils/enums/tasks-statuses.enum";
import { TasksType } from "../../../shared/utils/enums/tasks-type.enum";
import { Categorie } from "../../categories/entities/categorie.entity";
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

  @Column({ type: "enum", enum: TasksType })
  task: TasksType;

  @Column({ type: "enum", enum: TasksStatuses })
  status: TasksStatuses;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @ManyToOne(() => Categorie, (categorie) => categorie.tasks)
  categorie: Categorie;
}